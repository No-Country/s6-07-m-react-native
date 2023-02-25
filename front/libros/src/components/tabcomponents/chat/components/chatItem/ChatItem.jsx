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
//Axios
import { get } from '../../../../../utils/apiUtils'
//Alerts
import { alertToast } from '../../../../../utils/alertsUtils'

const ChatItem = ({ item }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const historyChat = useSelector(state => state.chat)

    const handlePressed = async () => {
        console.log("Handle Pressed")
        try {
            const response = await get("chat/history/" + item.ChatID)
            console.log(response)

            if(response.ok) {
                console.log("Entró el OK.")
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


    const {navigate} = useNavigation()
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