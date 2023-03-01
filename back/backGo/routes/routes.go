package routes

import (
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/controllers"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/middlewares"
	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {

	UserGroup := r.Group("/user")

	// User Routes
	UserGroup.POST("/signup",controllers.SignUp)
	UserGroup.POST("/login",controllers.Login)
	ChatGroup := r.Group("/chat")

	// Chat Routes
	ChatGroup.POST("/", middlewares.VerifyToken,controllers.CreateChat)
	ChatGroup.GET("/history/:id", controllers.GetHistoryChats)
	ChatGroup.POST("/conversation", controllers.GetConversation)
	ChatGroup.POST("/message", controllers.FirstMessage)
	ChatGroup.PUT("/:chatId", controllers.DeleteChat)
}
