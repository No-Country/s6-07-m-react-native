package routes

import (
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/controllers"
	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {

	UserGroup := r.Group("/user")

	UserGroup.POST("/signup", controllers.SignUp)
	UserGroup.POST("/login", controllers.Login)
}
