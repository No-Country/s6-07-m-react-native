package socketio

import (
	"fmt"
	"log"

	socketio "github.com/googollee/go-socket.io"
	
)



func InitSocket() *socketio.Server {
	server := socketio.NewServer(nil)

	server.OnConnect("/", func (s socketio.Conn)error  {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		return nil
	})
	server.OnEvent("/", "message",func (s socketio.Conn, msg string)  {
		log.Printf("Mensaje recivido del cliente %v : %v", s.ID(),msg)
	})
	server.OnDisconnect("/", func (s socketio.Conn, reason string)  {
		log.Printf("Client disconnected: %v . Reason: %v", s.ID(), reason)
	})
	return server
}
