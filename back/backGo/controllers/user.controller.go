package controllers

import (
	"context"
	"net/http"
	"net/mail"
	"os"
	"strings"
	"time"

	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/db"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/model"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

type SignUpModel struct {
	Username   string `bson:"username"`
	Password   string `bson:"password"`
	RePassword string `bson:"rePassword"`
	Email      string `bson:"email"`
}

type MyClaimsSignIn struct {
	ID    primitive.ObjectID `json:"userId"`
	Email string             `json:"email"`
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
func SignUp(c *gin.Context) {

	userColl := db.GetDBCollection("users")
	body := SignUpModel{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return

	}

	if body.Password == "" || body.Email == "" || body.Username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Incomplete values"})
		return
	}
	if body.Password != body.RePassword {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Passwords doesn't match"})
		return
	}
	if strings.TrimSpace(body.Password) == "" || strings.Replace(body.Password, " ", "", -1) != body.Password {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "The Password cannot be empty or have spaces in it"})
		return
	}

	if !validMail(body.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Invalid Email"})
		return

	}
	if len(body.Password) < 7 {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Password must have more than 6 characters"})
		return
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
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	body.Password = string(hashPassword)
	newUser := model.User{
		Password: body.Password,
		Username: strings.ToLower(body.Username),
		Email:    strings.ToLower(body.Email),
	}
	cursor, err := userColl.InsertOne(context.TODO(), newUser)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"done": true, "userId": cursor.InsertedID, "msg": "User successfully created"})

}

func Login(c *gin.Context) {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
	// fmt.Println(c.MustGet("userId"))
	Secret := os.Getenv("SECRET")
	body := model.User{}
	user := model.User{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		return
	}
	if body.Email == "" || body.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Incomplete values"})
		return
	}

	UserColl := db.GetDBCollection("users")
	filter := bson.M{"email": strings.ToLower(body.Email)}
	projection := bson.M{"name": 1, "profileImage": 1, "username": 1, "password": 1}
	if err := UserColl.FindOne(context.TODO(), filter, options.FindOne().SetProjection(projection)).Decode(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Incorrect email or password"})
		return
	}
	if !comparePassword(user.Password, body.Password) {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Incorrect email or password"})
		return
	}

	claims := MyClaimsSignIn{
		user.ID,
		user.Email,
		jwt.StandardClaims{
			ExpiresAt: time.Now().AddDate(0, 0, 60).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(Secret))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"done": true, "user": user, "token": signedToken})

}
