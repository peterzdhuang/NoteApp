package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func getDatabase() *mongo.Database {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Get MongoDB URI and database name from environment variables
	mongoURI := os.Getenv("MONGO_URI")
	dbName := os.Getenv("MONGO_DB_NAME")

	// Create a new MongoDB client and connect to the server
	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatalf("Error creating MongoDB client: %v", err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatalf("Error disconnecting from MongoDB: %v", err)
		}
	}()

	// Ping the primary to verify the client connection
	if err := client.Ping(context.TODO(), nil); err != nil {
		log.Fatalf("Error pinging MongoDB: %v", err)
	}
	fmt.Println("Successfully connected to MongoDB")

	// Get a handle for the database
	return client.Database(dbName)
}

func createFile(db *mongo.Database, fileID string, fileName string, rating int, uploader string, classID string) (string, error) {
	filesCollection := db.Collection("Files")
	file := bson.D{
		{Key: "fileID", Value: fileID},
		{Key: "fileName", Value: fileName},
		{Key: "rating", Value: rating},
		{Key: "uploader", Value: uploader},
		{Key: "classID", Value: classID},
	}

	result, err := filesCollection.InsertOne(context.TODO(), file)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(string), nil
}

func createClass(db *mongo.Database, className string, year int, professorName string, universityID string) (string, error) {
	classesCollection := db.Collection("Classes")
	class := bson.D{
		{Key: "className", Value: className},
		{Key: "year", Value: year},
		{Key: "professorName", Value: professorName},
		{Key: "universityID", Value: universityID},
	}

	result, err := classesCollection.InsertOne(context.TODO(), class)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(string), nil
}

func createUniversity(db *mongo.Database, universityName string, location string) (string, error) {
	universitiesCollection := db.Collection("Universities")
	university := bson.D{
		{Key: "universityName", Value: universityName},
		{Key: "location", Value: location},
	}

	result, err := universitiesCollection.InsertOne(context.TODO(), university)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(string), nil
}

func queryFilesFromClass(db *mongo.Database, classId int) ([]bson.M, error) {
	filesCollection := db.Collection("Files")
	cursor, err := filesCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var files []bson.M
	if err = cursor.All(context.TODO(), &files); err != nil {
		return nil, err
	}

	return files, nil
}

func queryAllClassesFromUni(db *mongo.Database, uniId int) ([]bson.M, error) {
	classesCollection := db.Collection("Classes")
	cursor, err := classesCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var classes []bson.M
	if err = cursor.All(context.TODO(), &classes); err != nil {
		return nil, err
	}

	return classes, nil
}

func findFile(db *mongo.Database, fileID string) (bson.M, error) {
	filesCollection := db.Collection("Files")
	objectID, err := primitive.ObjectIDFromHex(fileID)
	if err != nil {
		return nil, err
	}

	var file bson.M
	if err := filesCollection.FindOne(context.TODO(), bson.D{{Key: "_id", Value: objectID}}).Decode(&file); err != nil {
		return nil, err
	}

	return file, nil
}

func findClass(db *mongo.Database, classID string) (bson.M, error) {
	classesCollection := db.Collection("Classes")
	objectID, err := primitive.ObjectIDFromHex(classID)
	if err != nil {
		return nil, err
	}

	var class bson.M
	if err := classesCollection.FindOne(context.TODO(), bson.D{{Key: "_id", Value: objectID}}).Decode(&class); err != nil {
		return nil, err
	}

	return class, nil
}
