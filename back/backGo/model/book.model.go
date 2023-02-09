package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Book struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title"`
	Description string             `bson:"description"`
	UserId      primitive.ObjectID `bson:"userId"`
	CreatedAt   primitive.DateTime `bson:"createdAt"`
}
