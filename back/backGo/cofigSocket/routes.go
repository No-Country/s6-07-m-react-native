package configSocket

import "github.com/gin-gonic/gin"

import(
	"fmt"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
}

var connections = make(map[string]*websocket.Conn)

func RoutesWebSocket(c *gin.Context){
	
		conn, err := upgrader.Upgrade(c.Writer, c.Request,nil)
	if err != nil{
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

	for{
		
		_, message, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
		}
		fmt.Printf("Received message: %v \n Connections: %v \n" , string(message), connections)
		id := string(message)
	connections[id] = conn
	fmt.Printf("conexiones: %v , id del usuario: %v", connections, id)
		err = connections[id].WriteMessage(websocket.TextMessage, []byte("Hola wacho, te contesto desde el back"))
		if err != nil {
			fmt.Println(err)
		}
		
	}

	
}