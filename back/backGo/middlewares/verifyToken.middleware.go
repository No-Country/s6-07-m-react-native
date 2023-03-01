package middlewares

import (
	
	"net/http"
	"os"
	"strings"
	

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func VerifyToken(c *gin.Context) {
	authorization := c.GetHeader("Authorization")
	
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
	
	Secret := os.Getenv("SECRET")
	if authorization == "" {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Token needed"})
		c.Abort()
		return
	}

	tokenString := strings.Replace(authorization,"Bearer ","",1)

	
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.NewValidationError("Invalid signing method", jwt.ValidationErrorSignatureInvalid)
		}
		return []byte(Secret), nil
	})
	if err != nil {
		
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": err.Error()})
		c.Abort()
		return
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.JSON(http.StatusBadRequest, gin.H{"done": false, "msg": "Invalid token"})
		c.Abort()
		return
	}
	c.Set("userId", claims["userId"])
	
	c.Next()
}
