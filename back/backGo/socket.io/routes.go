package socketio

import (
	"log"

	socketio "github.com/googollee/go-socket.io"
)


func HandleSocketIo(server *socketio.Server){
	server.OnEvent("/", "ping", func (s socketio.Conn, msg string)  {
		log.Println(msg)
		s.Emit("pong", msg)
	})
}