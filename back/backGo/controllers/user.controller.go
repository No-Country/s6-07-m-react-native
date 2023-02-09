package controllers

import (
	"context"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/db"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/model"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	"net/mail"
)

func validMail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}
func SignUp(c *fiber.Ctx) error {
	dtb, err := db.MongoConnection()
	if err != nil {
		panic(err)
	}
	userColl := dtb.Database("giveAway").Collection("user")
	body := model.User{}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": err.Error()})
	}
	if body.Name == "" || body.Password == "" || body.Email == "" || body.Username == "" {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "Incomplete values"})

	}
	if !validMail(body.Email) {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "Invalid Email"})
	}
	if len(body.Password) < 7 {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "Password must have more than 6 characters"})
	}
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	indexEmail := mongo.IndexModel{
		Keys:    bson.M{"email": 1},
		Options: options.Index().SetUnique(true),
	}
	indexUserName := mongo.IndexModel{
		Keys:    bson.M{"username": 1},
		Options: options.Index().SetUnique(true),
	}
	indexes := []mongo.IndexModel{indexEmail, indexUserName}
	_, err = userColl.Indexes().CreateMany(context.TODO(), indexes)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": err.Error()})
	}
	body.Password = string(hashPassword)
	cursor, err := userColl.InsertOne(context.TODO(), body)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(bson.M{"done": true, "userId": cursor.InsertedID, "msg": "User successfully created"})
}

//func SignIn(c *fiber.Ctx) error {
//	body := model.User{}
//	if err := c.BodyParser(&body); err != nil {
//		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": err.Error()})
//	}
//
//}
