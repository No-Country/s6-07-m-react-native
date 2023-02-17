package main

import (
	"fmt"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/routes"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"

	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/db"
	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/socket.io"
	"github.com/joho/godotenv"

)

func main() {
	if err := run(); err != nil{
		panic(err)
	}

}


func run()error{
	if err := godotenv.Load(); err != nil {
		fmt.Println("No .env file found")
		return err
	}

	port := os.Getenv("PORT")
	err := db.InitDB()
	if err != nil {
		return err
	}
	defer func() {
		if err := db.CloseDB(); err != nil {
			panic(err)
		}
	}()
	gin.SetMode(gin.ReleaseMode)

	r := gin.Default()

	if port == "" {
		port = ":3050"
	}


	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to db")
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, "Welcome to GiveAway 📖🤝📖")
		
	})
	server := socketio.InitSocket()
	socketio.HandleSocketIo(server)
	routes.UserRoutes(r)
	fmt.Printf("Listening on Port %v \n", port)
	if err := r.Run(port); err != nil {
		return err
	}
	return nil
}