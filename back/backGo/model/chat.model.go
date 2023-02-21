package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Chat struct {
	ID       primitive.ObjectID   `bson:"_id,omitempty"`
	Messages []primitive.ObjectID `bson:"messages"`
	UserOne  primitive.ObjectID   `bson:"userOne"`
	UserTwo  primitive.ObjectID   `bson:"userTwo"`
}

type Message struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"`
	UserId  primitive.ObjectID `bson:"userId"`
	Content string             `bson:"content"`
}
