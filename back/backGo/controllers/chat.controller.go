package controllers

import (
	"context"
	"fmt"

	"net/http"
	"reflect"

	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/db"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/model"
	// "github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/configSocket"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateChat(c *gin.Context) {
	chatColl := db.GetDBCollection("chats")
	userColl := db.GetDBCollection("users")
	body := model.Chat{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}

	if reflect.TypeOf(body.Messages) != reflect.TypeOf([]primitive.ObjectID{}) || reflect.TypeOf(body.Users[0]) != reflect.TypeOf(primitive.ObjectID{}) || reflect.TypeOf(body.Users[1]) != reflect.TypeOf(primitive.ObjectID{}) {
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

	resOne := userColl.FindOneAndUpdate(context.TODO(), bson.M{"_id": body.Users[0]}, bson.M{"$push": bson.M{
		"chats": cursor.InsertedID,
	}})

	if resOne.Err() != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": resOne.Err().Error()})
		return
	}

	resTwo := userColl.FindOneAndUpdate(context.TODO(), bson.M{"_id": body.Users[1]}, bson.M{"$push": bson.M{
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

type UserChat struct {
	ID    primitive.ObjectID   `bson:"_id"`
	Chats []primitive.ObjectID `bson:"chats"`
}

type ChatStruct struct {
	ID       primitive.ObjectID   `bson:"_id"`
	Users    []primitive.ObjectID `bson:"users"`
	Messages []primitive.ObjectID `bson:"messages"`
}
type ChatUserName struct {
	ChatID      primitive.ObjectID `bson:"_id"`
	User        bson.M             `bson:"user"`
	LastMessage LastMessage
}
type LastMessage struct {
	Content string `bson:"content"`
	Empty   bool
}

func GetHistoryChats(c *gin.Context) {
	userColl := db.GetDBCollection("users")
	chatColl := db.GetDBCollection("chats")
	userId := c.Param("id")
	fmt.Println(primitive.IsValidObjectID(userId))

	if userId == "" || !primitive.IsValidObjectID(userId) {
		c.JSON(http.StatusBadRequest, gin.H{
			"done": false,
			"msg":  "Invalid ID",
		})
		return
	}
	id, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"done": false,
			"msg":  err.Error(),
		})
		return
	}
	filter := bson.M{"_id": id}
	user := UserChat{}
	projectionUser := bson.M{"chats": 1}
	if err := userColl.FindOne(context.TODO(), filter, options.FindOne().SetProjection(projectionUser)).Decode(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"done": false,
			"msg":  err.Error(),
		})
		return
	}

	var ChatsGroupName []ChatUserName
	for i := 0; i < len(user.Chats); i++ {
		chat := ChatStruct{}
		messagesColl := db.GetDBCollection("messages")
		lastMessage := LastMessage{}

		userName := bson.M{}
		projectionChat := bson.M{"users": 1, "messages": 1}
		filterChat := bson.M{"_id": user.Chats[i]}
		if err := chatColl.FindOne(context.TODO(), filterChat, options.FindOne().SetProjection(projectionChat)).Decode(&chat); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": user})
			return
		}
		messagesLen := len(chat.Messages)

		if messagesLen > 0 {
			if err := messagesColl.FindOne(context.TODO(), bson.M{"_id": chat.Messages[messagesLen-1]}, options.FindOne().SetProjection(bson.M{"content": 1})).Decode(&lastMessage); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
				return
			}
			lastMessage.Empty = false
		} else {
			lastMessage.Empty = true
		}

		if user.ID == chat.Users[0] {
			filterNames := bson.M{"_id": chat.Users[1]}
			if err := userColl.FindOne(context.TODO(), filterNames, options.FindOne().SetProjection(bson.M{"username": 1, "_id": 0})).Decode(&userName); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
				return
			}
			ChatsGroupName = append(ChatsGroupName, ChatUserName{ChatID: chat.ID, User: userName, LastMessage: lastMessage})

		}
		if user.ID == chat.Users[1] {
			filterNames := bson.M{"_id": chat.Users[0]}
			if err := userColl.FindOne(context.TODO(), filterNames, options.FindOne().SetProjection(bson.M{"username": 1, "_id": 0})).Decode(&userName); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
				return
			}
			ChatsGroupName = append(ChatsGroupName, ChatUserName{ChatID: chat.ID, User: userName, LastMessage: lastMessage})
		}

	}
	c.JSON(http.StatusAccepted, gin.H{
		"done":  true,
		"chats": ChatsGroupName,
	})
}

func searchInSlice(slc []primitive.ObjectID, id primitive.ObjectID) bool {
	for _, v := range slc {
		if v == id {
			return true
		}
	}
	return false
}

func PostMessage(chatId, message, userId string) model.RetMessage{
	
	MessageColl := db.GetDBCollection("messages")
	ChatColl := db.GetDBCollection("chats")

	if userId == "" || !primitive.IsValidObjectID(userId) {
		return model.RetMessage{Done: false, Msg: "Inavlid userID"}
	}
	if chatId == "" || !primitive.IsValidObjectID(chatId) {
		return model.RetMessage{Done: false, Msg: "Inavlid ChatID"}
	}
	chat := model.Chat{}
	if err := ChatColl.FindOne(context.TODO(), bson.M{"_id": chatId}).Decode(&chat); err != nil {
		return model.RetMessage{Done: false, Msg: err.Error()}
	}
	idUser, err := primitive.ObjectIDFromHex(userId)
	if err != nil {
		return model.RetMessage{Done: false, Msg: "Problem with userId"}
	}
	if !searchInSlice(chat.Users, idUser) {
		return model.RetMessage{Done: false, Msg: "User does not match with the chat"}
	}
	body := model.Message{UserId: idUser, Content: message}
	cursor, err := MessageColl.InsertOne(context.TODO(),body)
	if err != nil {
		return model.RetMessage{Done: false, Msg: err.Error()}
	}
	return model.RetMessage{Done: true, Msg: "Message successfully created", Data: bson.M{"messageId": cursor.InsertedID}}

}
