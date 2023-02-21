package controllers

import (
	"context"
	"fmt"
	"net/http"
	"reflect"

	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/db"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/model"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)



func CreateChat(c *gin.Context) {
	chatColl := db.GetDBCollection("chats")
	userColl := db.GetDBCollection("users")
	body := model.Chat{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	fmt.Println(reflect.TypeOf(body.UserOne))
	

	if reflect.TypeOf(body.Messages) != reflect.TypeOf([]primitive.ObjectID{}) || reflect.TypeOf(body.UserOne) != reflect.TypeOf(primitive.ObjectID{}) || reflect.TypeOf(body.UserTwo) != reflect.TypeOf(primitive.ObjectID{}) {
		c.JSON(http.StatusBadRequest, gin.H{
			"done": false,
			"msg":  "Wrong parameters",
		})
		return
	}

	cursor, err := chatColl.InsertOne(context.TODO(), body)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{
			"done": false,
			"msg":  err.Error(),
		})
		return
	}

	resOne := userColl.FindOneAndUpdate(context.TODO(), bson.M{"_id": body.UserOne}, bson.M{"$push": bson.M{
		"chats": cursor.InsertedID,
	}})

	if resOne.Err() != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": resOne.Err().Error()})
		return
	}

	resTwo := userColl.FindOneAndUpdate(context.TODO(), bson.M{"_id": body.UserTwo}, bson.M{"$push": bson.M{
		"chats": cursor.InsertedID,
	}})

	if resTwo.Err() != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": resOne.Err().Error()})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{
		"done":   true,
		"msg":    "Chat succesfully created",
		"chatId": cursor.InsertedID,
	})

}
