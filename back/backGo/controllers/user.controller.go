package controllers

import (
	"context"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/db"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/model"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	"net/mail"
	"os"
	"strings"
)

type MyClaimsSignIn struct {
	ID    primitive.ObjectID `bson:"_id"`
	Email string             `bson:"email"`
	jwt.StandardClaims
}

func validMail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func comparePassword(hashPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashPassword), []byte(password))
	return err == nil
}
func SignUp(c *fiber.Ctx) error {

	userColl := db.GetDBCollection("users")
	body := model.User{}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": err.Error()})
	}
	//body.Name == ""
	if body.Password == "" || body.Email == "" || body.Username == "" {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "Incomplete values"})

	}
	if strings.TrimSpace(body.Password) == "" || strings.Replace(body.Password, " ", "", -1) != body.Password {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "The Password cannot be empty or have spaces in it"})
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

	_, err := userColl.Indexes().CreateMany(context.Background(), indexes)
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

func Login(c *fiber.Ctx) error {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
	Secret := os.Getenv("SECRET")
	body := model.User{}
	user := model.User{}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": err.Error()})
	}
	if body.Email == "" || body.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "Incomplete values"})
	}

	UserColl := db.GetDBCollection("users")
	filter := bson.M{"email": body.Email}
	projection := bson.M{"name": 1, "profileImage": 1, "username": 1, "password": 1}
	if err := UserColl.FindOne(context.TODO(), filter, options.FindOne().SetProjection(projection)).Decode(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "Incorrect email or password"})
	}
	if !comparePassword(user.Password, body.Password) {
		return c.Status(fiber.StatusBadRequest).JSON(bson.M{"done": false, "msg": "Incorrect email or password"})
	}

	claims := MyClaimsSignIn{
		user.ID,
		user.Email,
		jwt.StandardClaims{
			ExpiresAt: 60 * 60 * 60,
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(Secret))
	if err != nil {
		return c.JSON(bson.M{"err": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(bson.M{"done": true, "user": user, "token": signedToken})

}
