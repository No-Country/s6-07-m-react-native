package main

import (
	"fmt"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/routes"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"os"

	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/db"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")

	}

	port := os.Getenv("PORT")
	err := db.InitDB()
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := db.CloseDB(); err != nil {
			panic(err)
		}
	}()
	app := fiber.New()
	if port == "" {
		port = ":3050"
	}
	app.Use(logger.New())

	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to db")
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON("Welcome to GiveAway 📖🤝📖")
	})
	routes.UserRoutes(app)
	if err := app.Listen(port); err != nil {
		panic(err)
	}

	fmt.Printf("Listening on Port: %v \n", port)
}
