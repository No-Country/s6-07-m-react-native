package db

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
)

func MongoConnection() (*mongo.Client, error) {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")

	}
	mongodbURI := os.Getenv("MONGODB_URI")

	if mongodbURI == "" {
		panic("Need valid Mongodb Direction")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongodbURI))
	if err != nil {
		panic(err)
	}
	return client, nil
}
