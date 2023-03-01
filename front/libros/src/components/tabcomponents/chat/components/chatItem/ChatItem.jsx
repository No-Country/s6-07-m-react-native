//React
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    View,
    Text,
    TouchableHighlight,
} from "react-native"
//styles
import Avatar from '../../../home/bookdetail/avatar'
import { styles } from './styles'
import { colors } from '../../../../../utils/constants'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setHistoryChat } from "../../../../../store/slices/historyChat.slice"
//Axios
import { get, post } from '../../../../../utils/apiUtils'
//Alerts
import { alertToast } from '../../../../../utils/alertsUtils'

const ChatItem = ({ item }) => {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const historyChat = useSelector(state => state.historyChat)
    const { navigate } = useNavigation()

    const handlePressed = async () => {
        console.log("Handle Pressed", item)
        try {
            const response = await post("/chat/conversation/", {chatId: item.ChatID, userId: user.ID})
            console.log("ChatItem Response: ", response)

            if(response.ok) {
                console.log("Entró el OK.")
                dispatch(setHistoryChat({
                    ...historyChat,
                    conversation: response.data.data,
                    chatId: item.ChatID
                }))

                navigate("Conversation")
            } else {
                alertToast(
                    "error", 
                    response.status, 
                    "Ocurrió un error. Intenta nuevamente más tarde."
                )
            }

        } catch (error) {
            console.log("Catch Error ChatItem: ", error)
            alertToast(
                "error", 
                error.status, 
                "Ocurró un error. Intenta nuevamente."
            )
        }
    }

    return (
        <TouchableHighlight
            onPress={()=> {handlePressed()}}
            underlayColor={colors.secondary}
        >
            <View style={styles.container}>
                <Avatar />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.User.username}</Text>
                    <Text style={styles.text}>{!item.LastMessage.Empty ? item.LastMessage.content : "Chat vacío"}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default ChatItem