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

type ChatModelForSearch struct {
	ID    primitive.ObjectID   `bson:"_id"`
	Users []primitive.ObjectID `bson:"users"`
}

func CreateChat(c *gin.Context) {
	chatColl := db.GetDBCollection("chats")
	userColl := db.GetDBCollection("users")
	userId := c.MustGet("userId").(string)

	body := model.Chat{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	userIdObj,err := primitive.ObjectIDFromHex(userId)
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Invalid UserId"})
		return
	}
	body.Users = append(body.Users, userIdObj)
	if reflect.TypeOf(body.Messages) != reflect.TypeOf([]primitive.ObjectID{}) || reflect.TypeOf(body.Users[0]) != reflect.TypeOf(primitive.ObjectID{}) || reflect.TypeOf(body.Users[1]) != reflect.TypeOf(primitive.ObjectID{}) || reflect.TypeOf(body.BookId) != reflect.TypeOf(primitive.ObjectID{}) {
		c.JSON(http.StatusBadRequest, gin.H{
			"done": false,
			"msg":  "Wrong parameters",
		})
		return
	}
	if len(body.Users) > 2 {
		c.JSON(http.StatusBadRequest, gin.H{
			"done": false,
			"msg":  "Only 2 users are accepted",
		})
		return
	}
	if body.Users[0] == body.Users[1] {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Cannot create a chat with the same 2 users"})
		return
	}
	if body.BookId == primitive.NilObjectID || body.Users[0] == primitive.NilObjectID || body.Users[1] == primitive.NilObjectID {
		c.JSON(http.StatusBadRequest, gin.H{
			"done": false,
			"msg":  "Invalid BookId or UserId",
		})
		return
	}

	// busco en los chats si coincide con el book en caso de coincider veo si coinciden los users
	var chatsSameBook []ChatModelForSearch

	res, err := chatColl.Find(context.TODO(), bson.M{"bookId": body.BookId}, options.Find().SetProjection(bson.M{"users": 1}))
	if err != nil {
		fmt.Println(err.Error())
	}
	res.All(context.TODO(), &chatsSameBook)

	if len(chatsSameBook) > 0 {

		for i := 0; i < len(chatsSameBook); i++ {

			if chatsSameBook[i].Users[0] == body.Users[0] && chatsSameBook[i].Users[1] == body.Users[1] || chatsSameBook[i].Users[0] == body.Users[1] && chatsSameBook[i].Users[1] == body.Users[0] {

				c.JSON(http.StatusOK, gin.H{"done": false, "msg": "Chat already exists", "chatId": chatsSameBook[i].ID})
				return

			}

		}
	}

	userOne := model.User{}
	userTwo := model.User{}

	if err := userColl.FindOne(context.TODO(), bson.M{"_id": body.Users[0]}, options.FindOne().SetProjection(bson.M{"books": 1})).Decode(&userOne); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "No se encontro el usuario"})
		return
	}
	var bookDone bool
	if len(userOne.Books) != 0 {
		for i := 0; i < len(userOne.Books); i++ {
			if userOne.Books[i] == body.BookId {
				bookDone = true
				body.DonatorUser = userOne.ID
			}
		}
	}
	if !bookDone {
		if err := userColl.FindOne(context.TODO(), bson.M{"_id": body.Users[1]}, options.FindOne().SetProjection(bson.M{"books": 1})).Decode(&userTwo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "No se encontro el usuario"})
			return
		}
		if len(userTwo.Books) != 0 {
			for i := 0; i < len(userTwo.Books); i++ {
				if userTwo.Books[i] == body.BookId {
					bookDone = true
					body.DonatorUser = userTwo.ID

				}
			}
		}
	}
	if !bookDone {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Neither user has the book published"})
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

	c.JSON(http.StatusOK, gin.H{
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

func PostMessage(chatId, message, userId string) model.RetMessage {

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
	idChat, err := primitive.ObjectIDFromHex(chatId)
	if err != nil {
		return model.RetMessage{Done: false, Msg: "Problem with chatId"}
	}
	if !searchInSlice(chat.Users, idUser) {
		return model.RetMessage{Done: false, Msg: "User does not match with the chat"}
	}
	body := model.Message{UserId: idUser, Content: message, ChatId: idChat}
	cursor, err := MessageColl.InsertOne(context.TODO(), body)
	if err != nil {
		return model.RetMessage{Done: false, Msg: err.Error()}
	}
	return model.RetMessage{Done: true, Msg: "Message successfully created", Data: bson.M{"messageId": cursor.InsertedID}}

}

type bodyGetMsg struct {
	UserId primitive.ObjectID `bson:"userId"`
	ChatID primitive.ObjectID `bson:"chatId"`
}

func GetConversation(c *gin.Context) {
	chatColl := db.GetDBCollection("chats")
	userColl := db.GetDBCollection("users")
	messagesColl := db.GetDBCollection("messages")
	body := bodyGetMsg{}
	if err := c.ShouldBindJSON(&body); err != nil {
		fmt.Printf("Aca? 1 \n")
		c.JSON(http.StatusAccepted, gin.H{"done": false, "msg": err.Error()})
		return
	}
	chat := model.Chat{}
	if err := chatColl.FindOne(context.TODO(), bson.M{"_id": body.ChatID}).Decode(&chat); err != nil {
		fmt.Printf("Aca? 2 \n")
		c.JSON(http.StatusAccepted, gin.H{"done": false, "msg": err.Error()})
		return
	}

	var groupMessages []model.Message
	for i := 0; i < len(chat.Messages); i++ {
		messages := model.Message{}
		if err := messagesColl.FindOne(context.TODO(), bson.M{"_id": chat.Messages[i]}).Decode(&messages); err != nil {
			fmt.Printf("Aca? 3 \n")
			c.JSON(http.StatusAccepted, gin.H{"done": false, "msg": err.Error()})
			return
		}
		if err := userColl.FindOne(context.TODO(), bson.M{"_id": messages.UserId}).Decode(&messages.User); err != nil {
			fmt.Printf("Aca? 3 \n")
			c.JSON(http.StatusAccepted, gin.H{"done": false, "msg": err.Error()})
			return
		}
		groupMessages = append(groupMessages, messages)

	}
	// fmt.Println(groupMessages)
	
	if len(groupMessages) == 0 {

	c.JSON(http.StatusAccepted, gin.H{"done": true, "data": []bson.M{} , "msg": "succeed"})
return
	}
	c.JSON(http.StatusAccepted, gin.H{"done": true, "data": groupMessages , "msg": "succeed"})

}

type bodyFirstMsg struct {
	ChatId  primitive.ObjectID `bson:"chatId"`
	Message string             `bson:"message"`
	UserId  primitive.ObjectID `bson:"userId"`
}

func FirstMessage(c *gin.Context) {
	body := bodyFirstMsg{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	fmt.Println(body)
	// chatId, message, userId string
	MessageColl := db.GetDBCollection("messages")
	ChatColl := db.GetDBCollection("chats")

	if reflect.TypeOf(body.UserId) != reflect.TypeOf(primitive.ObjectID{}) {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Invalid userID"})
		return
	}
	if reflect.TypeOf(body.ChatId) != reflect.TypeOf(primitive.ObjectID{}) {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Inavlid ChatID"})
		return
	}
	chat := model.Chat{}
	if err := ChatColl.FindOne(context.TODO(), bson.M{"_id": body.ChatId}).Decode(&chat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}

	if !searchInSlice(chat.Users, body.UserId) {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "User does not match with the chat"})
		return
	}
	bodyMsg := model.Message{UserId: body.UserId, Content: body.Message, ChatId: body.ChatId}
	cursor, err := MessageColl.InsertOne(context.TODO(), bodyMsg)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	c.JSON(http.StatusBadRequest, gin.H{"done": true, "msg": "message successfully created", "messageId": cursor.InsertedID})

}

type bodyDeleteChat struct {
	UserId primitive.ObjectID `bson:"userId"`
	// Msg string 	`bson:"msg"`
}

func DeleteChat(c *gin.Context) {
	chatId := c.Param("chatId")
	body := bodyDeleteChat{}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		fmt.Println(err.Error())

		return
	}

	idChatId, err := primitive.ObjectIDFromHex(chatId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})

		return
	}
	chatColl := db.GetDBCollection("chats")
	userColl := db.GetDBCollection("users")
	chat := model.Chat{}
	if err := chatColl.FindOne(context.TODO(), bson.M{"_id": idChatId}).Decode(&chat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}

	if chat.Users[0] != body.UserId && chat.Users[1] != body.UserId {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Error with UserId"})
		return
	}
	bodyDeleted := model.Chat{}
	if err := chatColl.FindOneAndDelete(context.TODO(), bson.M{"_id": idChatId}).Decode(&bodyDeleted); err != nil {
		c.JSON(http.StatusBadRequest, bson.M{"done": false, "msg": err.Error()})
		return
	}
	userOne := model.User{}
	userTwo := model.User{}
	if err := userColl.FindOneAndUpdate(context.TODO(), bson.M{"_id": chat.Users[0]}, bson.M{"$pull": bson.M{"chats": idChatId}}).Decode(&userOne); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	if err := userColl.FindOneAndUpdate(context.TODO(), bson.M{"_id": chat.Users[1]}, bson.M{"$pull": bson.M{"chats": idChatId}}).Decode(&userTwo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	fmt.Println(userOne)
	c.JSON(http.StatusAccepted, gin.H{"done": true, "msg": "Chat deleted successfully"})

}
