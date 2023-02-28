//React
import React, { useState, useEffect, useRef } from 'react'
import {
	View,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableHighlight,
} from 'react-native'
//styles
import { styles } from './styles'
//Icons
import { Ionicons } from '@expo/vector-icons'
//constants
import { colors } from '../../../../../../../utils/constants'
//Variables
import { REACT_APP_WEBSOCKET_URI } from '@env'
//Redux
import { useSelector } from 'react-redux'
//import {setState} from "../../../../../../../store/slices/conversation.slice"
//Emojis
import EmojiPicker from 'rn-emoji-keyboard'

const Input = () => {
	
    //Modelo de objeto que te envío vía websocket.
	const msgModel = {
		channel: "newMsg",
		chatID: '1234',
	 	userID: 'Mateo',
		content: 'Hola',
	}

    const historyConversation = {
        conversationID: "1234",
        msgs: [
            {
                msgID: "",
                userID: "",
                content: "",
            }
        ],
        userID: "",
    }



	//Proceso de chat:
	/* 
    Paso 1:
        - Entro al historial de chat.
        - Hago un GET con el historial de conversaciones del usuario logueado. 
        - Guardo la información en un conversationSlice.
    Paso 2:
        - Entro a una conversación.
        - Se hace un GET de la conversación. Te envío por parámetro el ID de la conversación.
        - Recibo como respuesta el historial de conversación.
        - Guardo el historial de conversación en conversationSlice.
        - Mapeo la conversación en la vista de conversación.
    Paso 3:
        - Tipeo un nuevo mensaje.
        - Al presionar Send, se envía el objeto msgModel.
        - En el servidor, se recibe el objeto msgModel y se realiza un PUT al historial de conversación.
        - El servidor, envía, como respuesta, un mensaje al front, con el estado de la query PATCH.
        - Si el status es 200, debería renderizarse el mensaje enviado en los globos de conversación.
        - Si el status es distinto de 200, renderizar un mensaje de error.
    Listado de rutas:
        GET:
        - chat/history/:id
        - chat/conversation/:id
        POST:
        - chat/
        PATCH:
        - chat/conversation/update/:id
        DELETE:
        - chat/destroy/:id
    */

    //Web Socket
	const socket = new WebSocket(REACT_APP_WEBSOCKET_URI)
	let [msg, setMsg] = useState("")
    let [socketResponse, setSocketResponse] = useState("")

    //Redux states
	const user = useSelector(state => state.user)
	//const conversation = useSelector(state => state.conversation)

	const [isOpen, setIsOpen] = useState(false)
	let [showKeyboard, setShowKeyboard] = useState(true)

	const inputRef = useRef()

	//console.log(user)

	useEffect(() => {
		socket.addEventListener('open', () => {
			const data = {
				channel: "USER_ID",
				userID: user.ID
			}
			socket.send(JSON.stringify(data))
		})
	}, [])

	useEffect(() => {
		socket.addEventListener('message', data => {
			setSocketResponse(data)
		})
	}, [])

	const submitMsg = () => {
		//console.log('Send Message pressed.')
        const newMsg = {
			channel: "NEW_MESSAGE",
            /* chatID: conversation.ID, */
            userID: user.ID,
            content: "Esta es una prueba importante.",
        }
		socket.send(JSON.stringify(newMsg))
		/* setState() */
	}
	//submitMsg()

	console.log('Message: ', msg)
	console.log('Socket Response: ', socketResponse)

	const toggleKeyboardType = () => {
		setIsOpen(!isOpen)
		setShowKeyboard(false)
	}

	/* useEffect(()=> {
        //Keyboard.addListener("keyboardDidHide", ()=> inputRef.current.blur())
        inputRef.current.focus()
    }, []) */

	return (
		<View>
			<View style={styles.container}>
				<TouchableHighlight
					onPress={toggleKeyboardType}
					underlayColor={colors.secondary}
					style={{ borderRadius: 20 }}
				>
					<Ionicons
						name={'happy-outline'}
						size={24}
						color={colors.textSecondaryVariant}
					/>
				</TouchableHighlight>

				<TextInput
					style={styles.input}
					name='msg'
					placeholder='Escribe aquí tu mensaje'
					onChangeText={value => setMsg(value)}
					defaultValue={msg}
					ref={inputRef}
					autoFocus={showKeyboard}
				/>

				<TouchableWithoutFeedback
					onPress={submitMsg}
					underlayColor={colors.secondary}
					style={{ borderRadius: 20 }}
				>
					<Ionicons
						name={'send-outline'}
						size={24}
						color={colors.textSecondaryVariant}
					/>
				</TouchableWithoutFeedback>
			</View>

			<EmojiPicker
				onEmojiSelected={pick => {
					setMsg(msg + pick.emoji)
					setIsOpen(false)
					inputRef.current.blur()
				}}
				open={isOpen}
				expandable={false}
				enableRecentlyUsed
				enableSearchBar
				categoryPosition={'top'}
				onClose={() => {
					setIsOpen(false)
				}}
			/>
		</View>
	)
}

export default Input
