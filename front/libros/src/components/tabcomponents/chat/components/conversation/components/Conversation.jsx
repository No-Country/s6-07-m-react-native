//React
import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, Text, Dimensions } from "react-native"
//Components
import Balloon from './balloon/Balloon'
import Input from './input/Input'
//Redux
import { useSelector, useDispatch } from "react-redux"
import { setConversation } from "../../../../../../store/slices/conversation.slice"
//Spinner
import Spinner from "../../../../../spinner/Spinner"

const Conversation = ({ID}) => {

	const items = [
		false,
		false,
		true,
		false,
		true,
		false,
		true
	]

	const dispatch = useDispatch()
	const historyChat = useSelector(state => state.historyChat)
	const user = useSelector(state => state.user)
	let [spinner, setSpinner] = useState("none")

	/* const setConversation = async () => {

		try {
			const chargeChat = {
				userId: user.user.ID,
				chatId: historyChat.chatId,
			}
			console.log("User ID Charge Conversation: ", user.user.ID)
			console.log('CHAT ID Charge Conversation: ', chargeChat)

			const response = await post('/chat/conversation', chargeChat)

			console.log('CARGANDO NUEVA CONVERSACION: ', response)

			if (response?.data?.msg === 'succeed') {
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
				return response?.data?.msg
			}
		} catch (error) {
			alertToast('error', 'ERRRORRR', 'Ocurrió un error. Intenta nuevamente.')
			console.log('Charge Conversation Catch Error: ', error)
			return false
		}
	}
	
		useEffect(()=> {
			setConversation()
		}, []) */
	

	console.log("Tamaño del array de Conversation: ", historyChat)

	return (
		<View
			style={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-end',
				height: '100%',
				width: '100%',
				backgroundColor: "white",
			}}
		>
			{
				historyChat.conversation.length > 0
				?
					<FlatList	
						data={historyChat.conversation}
						inverted
						renderItem={({ item }) => <Balloon userID={item.userId} msg={item.content} />}
						keyExtractor={(item, id) => id}
						style={{ 
							width: "100%",
							marginTop: 0, 
							marginBottom: 10,
							overflow: "hidden"
						}}
					/>
				:
				<View style={{
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					width: "100%",
				}}>
					<Text style={{
						fontFamily: "Roboto-Black",
						fontSize: 20,
					}}>
						Rompe el hielo :)
					</Text>
				</View>
			}
			<Input />
			<Spinner display={spinner} />
		</View>
	)
}

export default Conversation