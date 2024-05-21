package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
	"google.golang.org/api/option"
)

var srv *drive.Service

// Retrieve a token, saves the token, then returns the generated client.
func getClient(config *oauth2.Config) *http.Client {
	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	tokFile := "token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(tokFile, tok)
	}
	return config.Client(context.Background(), tok)
}

// Request a token from the web, then returns the retrieved token.
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)

	var authCode string
	if _, err := fmt.Scan(&authCode); err != nil {
		log.Fatalf("Unable to read authorization code %v", err)
	}

	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web %v", err)
	}
	return tok
}

// Retrieves a token from a local file.
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)
	return tok, err
}

// Saves a token to a file path.
func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

// corsMiddleware returns a CORS middleware handler
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight OPTIONS request
		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}

func test() {
	ctx := context.Background()
	b, err := os.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	// If modifying these scopes, delete your previously saved token.json.
	config, err := google.ConfigFromJSON(b, drive.DriveScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := getClient(config)

	srv, err = drive.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		log.Fatalf("Unable to retrieve Drive client: %v", err)
	}

	router := gin.Default()
	router.Use(corsMiddleware())
	router.POST("/upload", handleUpload)
	router.GET("/getlink/:fileId", handleGetFileLink)

	router.Run()
}

func handleUpload(c *gin.Context) {
	var fileData struct {
		FileName string `json:"fileName" binding:"required"`
		Rating   int    `json:"rating" binding:"required"`
		Uploader string `json:"uploader" binding:"required"`
		ClassID  string `json:"classId" binding:"required"`
	}

	if srv == nil {
		log.Printf("Drive service not initialized")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Drive service not initialized"})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		log.Printf("Unable to get file from request: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to get file"})
		return
	}

	f, err := file.Open()
	if err != nil {
		log.Printf("Unable to open file: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to open file"})
		return
	}
	defer f.Close()

	fileMetadata := &drive.File{
		Name: file.Filename,
	}

	uploadedFile, err := srv.Files.Create(fileMetadata).Media(f).Do()
	if err != nil {
		log.Printf("Unable to upload file: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to upload file"})
		return
	}

	if err := c.BindJSON(&fileData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Creating the metadata in the database
	db := getDatabase()
	createFile(db, uploadedFile.Id, fileData.FileName, fileData.Rating, fileData.Uploader, fileData.ClassID)

	c.JSON(http.StatusOK, gin.H{"fileId": uploadedFile.Id})
}

func handleGetFileLink(c *gin.Context) {
	if srv == nil {
		log.Printf("Drive service not initialized")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Drive service not initialized"})
		return
	}

	fileID := c.Param("fileId")

	file, err := srv.Files.Get(fileID).Fields("webViewLink").Do()

	if err != nil {
		log.Printf("Unable to get file metadata: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to get file metadata"})
		return
	}

	permission := &drive.Permission{
		Role: "reader",
		Type: "anyone",
	}
	_, err = srv.Permissions.Create(fileID, permission).Do()
	if err != nil {
		log.Fatalf("Unable to update file permissions: %v", err)
	}

	fileLink := file.WebViewLink
	index := strings.Index(fileLink, "view")
	fileLink = fileLink[:index] + "preview"

	c.JSON(http.StatusOK, gin.H{"fileLink": fileLink})
}
