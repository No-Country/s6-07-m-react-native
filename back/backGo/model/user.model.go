package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Address struct {
	Street      string
	Number      int64
	City        string
	PostalCode  int64
	Geolocation Geolocation
}
type Geolocation struct {
	Latitude  float64
	Longitude float64
}
type User struct {
	ID           primitive.ObjectID   `bson:"_id,omitempty"`
	Name         string               `bson:"name"`
	Username     string               `bson:"username"`
	Email        string               `bson:"email"`
	Password     string               `bson:"password"`
	ProfileImage string               `bson:"profileImage,omitempty"`
	Address      Address              `bson:"address"`
	Books        []primitive.ObjectID `bson:"books,omitempty"`
}
