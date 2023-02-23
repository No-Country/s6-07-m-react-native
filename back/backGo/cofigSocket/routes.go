package configSocket

import (
	"fmt"

	"github.com/No-Country/s6-07-m-react-native/tree/main/back/backGo/controllers"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	// "go.mongodb.org/mongo-driver/bson"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var connections = make(map[string]*websocket.Conn)

type FrontMessage struct {
	// ID string `bson:"id"`
	Channel string `json:"channel"`
	Content string `json:"content"`
	UserId  string `json:"userId"`
	ChatId  string `json:"chatId"`
}


func RoutesWebSocket(c *gin.Context) {

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Conexion establecida")

	defer conn.Close()

	message := []byte("Conexión establecida con éxito")
	err = conn.WriteMessage(websocket.TextMessage, message)
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		body := FrontMessage{}
		if err := conn.ReadJSON(&body); err != nil {
			fmt.Println(err)
		}
		if body.Channel == "USER_ID" {
			id := string(body.UserId)
			connections[id] = conn
			fmt.Printf("Objecto que llega: %v \n", body.Channel)

			fmt.Printf("Id del usuario conectado: %v \n Usuarios conectados: %v \n", id, connections)
		}
		if body.Channel == "NEW_MESSAGE" {
			res := controllers.PostMessage(body.ChatId, body.Content, body.UserId)
			fmt.Println(res)

		}
	}

}
