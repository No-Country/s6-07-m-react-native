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

const ChatItem = () => {

    const {navigate} = useNavigation()
    return (
        <TouchableHighlight
            onPress={()=> navigate("Conversation")}
        >
            <View style={styles.container}>
                <Avatar />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Title</Text>
                    <Text style={styles.text}>Este es el cuerpo del mensaje, el que vas a cantar y bailar en todos lados.</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default ChatItem