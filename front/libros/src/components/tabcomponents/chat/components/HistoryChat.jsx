//React
import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
//Components
import EmptyChat from './emptyChat/EmptyChat'
import ChatItem from './chatItem/ChatItem'
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { setHistoryChat } from "../../../../store/slices/historyChat.slice"
//Axios
import { get } from "../../../../utils/apiUtils";
//Alerts
import { alertToast } from '../../../../utils/alertsUtils'

const HistoryChat = () => {
    
    const dispatch = useDispatch()
	const historyChat = useSelector(state => state.historyChat)
    const user = useSelector(state => state.user)

    const dispatchHistoryChat = async() => {

        try {
            const {
                data: {chats}, 
                ok, 
                status
            } = await get("/chat/history/" + user.ID)

            if(ok) {
                dispatch(setHistoryChat({
                    ...historyChat,
                    historyChat: chats,
                    status: "succeded",
                }))
            } else {
                alertToast(
                    "error", 
                    status, 
                    "Ocurrió un error. Intenta nuevamente."
                )
            }
        } catch (error) {
            alertToast(
                "error", 
                error, 
                "Ocurrió un error. Intenta nuevamente."
            )
            console.log("Catch error: ", error)
        }
    }

    
    useEffect(()=> {
        dispatchHistoryChat()
    }, [historyChat.status === "idle"])

	return (
		<View style={{ marginTop: 30 }}>
			{
                historyChat?.historyChat?.length > 0 
                ?
				    <FlatList
					    data={historyChat.historyChat}
					    renderItem={({ item }) => <ChatItem  item = { item }/>}
					    keyExtractor={item => item.ChatID}
				    />
			    : 
			        <EmptyChat />
			}
		</View>
	)
}

export default HistoryChat