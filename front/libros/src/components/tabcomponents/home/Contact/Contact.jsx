//React
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ScrollView
} from "react-native"
import { useNavigation } from '@react-navigation/native'
//Components
import BookCard from "../bookCard/component/BookCard"
import Tips from "../tips/Tips"
import Balloon from "../../chat/components/conversation/components/balloon/Balloon"
//styles
import { styles } from './styles'
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { setHistoryChat } from '../../../../store/slices/historyChat.slice'
//Axios
import { post } from '../../../../utils/apiUtils'

const Contact = () => {

    const [text, setText] = useState('')
    const { bookSelected } = useSelector(state => state.books)
    const user = useSelector(state => state.user)
	const historyChat = useSelector(state => state.historyChat)
	const dispatch = useDispatch()
	const { navigate } = useNavigation()

    const resetLastMessage = () => {
            dispatch(setHistoryChat({
                ...historyChat,
                lastMessage: "",
            }))
    }
    
    const handlePressed = async () => {

		try {

            if(text.length > 0) {
                const data = {
                    users: [user.ID, bookSelected.userId],
                    bookId: bookSelected._id,
                }
                
                const { data: { done, status } } = await post('/chat', data)

                if (done) {
                    dispatch(setHistoryChat({
                        ...historyChat,
                        status: "idle",
                        lastMessage: text,
                    }))

                    setText("")

                } else {
                    alertToast(
                        "error", 
                        status, 
                        "Ocurrió un error. Intenta nuevamente."
                    )
                }
            }

		} catch (error) {
			console.log("Modal Catch Error: ", error)
		}
	}

    useEffect(() => resetLastMessage(), [])
    
    return (
        <ScrollView
            style={styles.container}
        >
            <View style={styles.bookCardContainer}>
                {
                    bookSelected
                        ?
                        <BookCard book={bookSelected} />
                        : ""
                }
            </View>
            <Tips />
            { historyChat.lastMessage
                ?
                    <Balloon 
                        userID = {user.ID} 
                        msg = {historyChat.lastMessage}
                    />
                :
                    ""
            }
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setText(text)}
                    placeholder="Escribe algo aquí"
                    value={text}
                    multiline={true}
                    textAlignVertical={"top"}
                />

                <TouchableHighlight 
                    style={styles.button}
                    onPress={handlePressed}
                >
                    <Text style={styles.text}>
                        Enviar Mensaje
                    </Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

export default Contact