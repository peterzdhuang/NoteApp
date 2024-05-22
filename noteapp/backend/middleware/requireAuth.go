package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/peterhuang569/NoteApp/initializer"
	"github.com/peterhuang569/NoteApp/models"
	"go.mongodb.org/mongo-driver/bson"
)

func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Request.Cookie("Authorization")
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		tokenString := cookie.Value

		// Parse the token with the provided secret key
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Incorrect signing method"})
			}
			return []byte(os.Getenv("Key")), nil
		})

		if err != nil || !token.Valid {
			fmt.Println(err, token)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			if claims["exp"].(float64) <= float64(time.Now().Unix()) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Cookie expired"})
			} else {
				fmt.Println("Auth successful")
				_, DB := initializer.LoadDB()
				var user models.User
				err := DB.Collection("User").FindOne(context.Background(), bson.M{"email": claims["Email"].(string)}).Decode(&user)

				if err != nil {
					c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
						"error": "User not found",
					})
				}

				c.Set("User", user)

				c.Next()
			}
		} else {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

	}
}
