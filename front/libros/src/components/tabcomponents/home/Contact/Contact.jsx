//React
import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
//Components
import BookCard from '../bookCard/component/BookCard'
import Tips from '../tips/Tips'
import Balloon from '../../chat/components/conversation/components/balloon/Balloon'
//styles
import { styles } from './styles'
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { setHistoryChat } from '../../../../store/slices/historyChat.slice'
//Axios
import { post, destroy, put, get } from '../../../../utils/apiUtils'
import axios from 'axios'
//Spinner
import Spinner from '../../../spinner/Spinner'
//Alert
import { showAlert, alertToast } from '../../../../utils/alertsUtils'

const Contact = () => {
	const [text, setText] = useState('Hola, estoy interesado en el libro...')
	let [spinner, setSpinner] = useState('none')
	const { bookSelected } = useSelector(state => state.books)
	const user = useSelector(state => state.user)
	const historyChat = useSelector(state => state.historyChat)
	const dispatch = useDispatch()
	const { navigate } = useNavigation()

	const resetLastMessage = () => {
		dispatch(
			setHistoryChat({
				...historyChat,
				lastMessage: '',
			})
		)
	}

	const chargeConversation = async () => {
		try {
			const chargeChat = {
				userId: user.user.ID,
				chatId: historyChat.chatId,
			}
			console.log("User ID Charge Conversation: ", user.user.ID)
			console.log('CHAT ID Charge Conversation: ', chargeChat)

			const response = await post('/chat/conversation', chargeChat)

			console.log('CARGANDO NUEVA CONVERSACION: ', response)

			if (response?.msg === 'succeded') {
				console.log('Charge Conversation Status 200')
				dispatch(
					setHistoryChat({
						...historyChat,
						conversation: response?.data?.messages,
					})
				)
				return response?.data?.msg
			} else {
				console.log('Charge Conversation Else', response)
				alertToast(
					'error',
					response?.status,
					'Ocurrió un error. Intenta nuevamente.'
				)
				return response?.data.msg
			}
		} catch (error) {
			alertToast('error', 'ERRRORRR', 'Ocurrió un error. Intenta nuevamente.')
			console.log('Charge Conversation Catch Error: ', error)
			return false
		}
	}

	const createChat = async () => {
		try {
			const data = {
				users: [bookSelected.userId],
				bookId: bookSelected._id,
				donatorUser: bookSelected.userId,
			}

			const response = await post('/chat', data)

			console.log('Create Chat Response: ', response.data)

			if (response?.data?.msg === 'Chat succesfully created') {
				dispatch(
					setHistoryChat({
						...historyChat,
						status: 'idle',
						lastMessage: text,
						chatId: response?.data?.chatId,
					})
				)

				return response?.data?.msg
			}

			if (response?.data?.msg === 'Chat already exists') {
				dispatch(
					setHistoryChat({
						...historyChat,
						status: 'idle',
						chatId: response?.data?.chatId,
					})
				)
				return response?.data?.msg || "Chat already exists"
			} else {
				alertToast('error', response?.status, 'Ocurrió un error. Intenta nuevamente.')
				return response?.data?.msg
			}
		} catch (error) {
			console.log('Create Chat Catch Error: ', error)
			return false
		}
	}

	const chargeMsg = async () => {
		try {
			const newMsg = {
				chatId: historyChat.chatId,
				userId: user.ID,
				message: text,
			}

			const chargeMessage = await post('/chat/message', newMsg)
			console.log('Charge Message Response: ', chargeMessage)

			if (chargeMessage?.status === 200) {
				setText('')

				showAlert({
					title: '¡Éxito! ' + chargeMessage?.status,
					msg: 'Solicitud enviada.',
					options: [
						{
							text: 'OK',
							onPress: () => navigate('HomeBooks'),
						},
					],
				})

				return chargeMessage?.status
			} else {
				return chargeMessage?.status
			}
		} catch (error) {
			console.log('Catch Error Charge Message', error)
			return false
		}
	}

	const destroyChat = async () => {
		try {
			const data = {
				userId: user.ID,
			}
			console.log('Chat ID: ', historyChat)

			const deleteChat = await put('/chat/' + historyChat.chatId, data)

			console.log('Delete Chat Response: ', deleteChat)
			console.log('Tipo de dato de UserID: ', user.ID)

			if (deleteChat.ok) {
				showAlert({
					title: 'Error: ' + deleteChat.status,
					msg: 'Ocurrió un error. Intenta nuevamente más tarde.',
					options: [
						{
							text: 'OK',
							onPress: () => console.log('Error: ', deleteChat),
						},
					],
				})

				return deleteChat.status
			} else {
				return deleteChat.status
			}
		} catch (error) {
			console.log('Catch Error Delete Message: ', error)
			return false
		}
	}

	const handlePressed = async () => {
		console.log('Handle Pressed Contact')
		try {
			setSpinner('flex')
			const newChat = await createChat()
			console.log('Handle Pressed newChat', newChat)
			if (newChat === 200) {
				const newMessage = await chargeMsg()

				if (newMessage == !200) {
					await destroyChat()
					return
				}

				return
			}

			if (newChat === 'Chat already exists') {
				await chargeConversation()
				return
			} else {
				await destroyChat()
				return
			}
			setSpinner('none')
			return
		} catch (error) {
			setSpinner('none')
			console.log('Handle Pressed Create Chat Error: ', error)
			return
		}
	}

	useEffect(() => resetLastMessage(), [])

	return (
		<ScrollView style={styles.container}>
			<View style={styles.bookCardContainer}>
				{bookSelected ? <BookCard book={bookSelected} /> : ''}
			</View>
			<Tips />
			{historyChat.lastMessage ? (
				<Balloon userID={user.ID} msg={historyChat.lastMessage} />
			) : (
				''
			)}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setText(text)}
					placeholder='Escribe algo aquí'
					value={text}
					multiline={true}
					textAlignVertical={'top'}
				/>

				<TouchableHighlight style={styles.button} onPress={handlePressed}>
					<Text style={styles.text}>Enviar Mensaje</Text>
				</TouchableHighlight>
			</View>
			<Spinner display={spinner} />
		</ScrollView>
	)
}

export default Contact
