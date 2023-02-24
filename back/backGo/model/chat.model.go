package model

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Chat struct {
	ID       primitive.ObjectID   `bson:"_id,omitempty"`
	Messages []primitive.ObjectID `bson:"messages"`
	Users    []primitive.ObjectID `bson:"users"`
	BookId   primitive.ObjectID   `bson:"bookId"`
}

type RetMessage struct {
	Done bool   `bson:"done"`
	Msg  string `bson:"msg"`
	Data bson.M `bson:"data"`
}

type Message struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"`
	UserId  primitive.ObjectID `bson:"userId"`
	Content string             `bson:"content"`
}
