package configSocket

import (

	"github.com/gin-gonic/gin"
	
)



func InitSocket(r *gin.Engine)  {

	r.GET("/ws", RoutesWebSocket)
}
