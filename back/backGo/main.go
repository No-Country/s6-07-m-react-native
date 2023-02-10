package main

import (
	"fmt"
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
	app := fiber.New()
	if port == "" {
		port = ":3050"
	}

	_, err := db.MongoConnection()
	if err != nil {
		panic(err)
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON("Welcome to GiveAway 📖🤝📖")
	})
	if err := app.Listen(port); err != nil {
		panic(err)
	}
	fmt.Printf("Listening on Port: %v \n", port)
}
