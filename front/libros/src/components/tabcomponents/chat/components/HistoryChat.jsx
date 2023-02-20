//React
import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
//Components
import EmptyChat from './emptyChat/EmptyChat'
import ChatItem from './chatItem/ChatItem'
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { setHistoryChat } from "../../../../store/slices/historyChat.slice"
//Axios
import { get } from "../../../../utils/apiUtils";

const HistoryChat = () => {
	const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const dispatch = useDispatch()
	const historyChat = useSelector(state => state.historyChat)
    const user = useSelector(state => state.user)

    const dispatchHistoryChat = async() => {

        try {
            const response = await get("/chat/history" + user.ID)

            if(response.status === 200) {
                dispatch(setHistoryChat())
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }

    /* 
    useEffect(()=> {
        dispatchHistoryChat()
    }, [])
    */
   
    //console.log(historyChat)

	return (
		<View style={{ marginTop: 30 }}>
			{
                historyChat.length > 0 
                ?
				    <FlatList
					    data={items}
					    renderItem={({ item }) => <ChatItem />}
					    keyExtractor={item => item}
				    />
			    : 
			        <EmptyChat />
			}
		</View>
	)
}

export default HistoryChat