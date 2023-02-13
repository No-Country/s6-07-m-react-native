package db

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
)

var db *mongo.Database

func GetDBCollection(coll string) *mongo.Collection {
	return db.Collection(coll)
}

func InitDB() error {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("You Must set your MONGODB_URI")
	}
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}
	db = client.Database("giveAway")
	return nil
}

func CloseDB() error {
	return db.Client().Disconnect(context.Background())
}
