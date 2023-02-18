package socketio

// import (
// 	"fmt"
	

// 	socketio "github.com/googollee/go-socket.io"
	
// )



// func InitSocket() *socketio.Server {
// 	server := socketio.NewServer(nil)

// 	server.OnConnect("/", func (s socketio.Conn)error  {
// 		s.SetContext("")
// 		fmt.Println("connected:", s.ID())
// 		return nil
// 	})
// 	server.OnEvent("/", "ping", func (s socketio.Conn, msg string)  {
// 		fmt.Println("Hola" + msg)
// 		s.Emit("pong", msg)
// 	})
// 	server.OnDisconnect("/", func (s socketio.Conn, reason string)  {
// 		fmt.Printf("Client disconnected: %v . Reason: %v", s.ID(), reason)
// 	})
// 	return server
// }
