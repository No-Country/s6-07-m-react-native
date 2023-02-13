package routes

import (
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {

	UserGroup := app.Group("/user")

	UserGroup.Post("/signUp", controllers.SignUp)
	UserGroup.Get("/login", controllers.Login)
}
