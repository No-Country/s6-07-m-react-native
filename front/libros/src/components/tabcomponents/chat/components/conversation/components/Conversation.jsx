//React
import React, { useState, useEffect } from 'react'
import { View, ScrollView, FlatList, Text } from "react-native"
//Components
import Balloon from './balloon/Balloon'
import Input from './input/Input'
//Redux
import { useSelector, useDispatch } from "react-redux"
import { setConversation } from "../../../../../store/slices/conversation.slice";

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
	const conversation = useSelector(state => state.conversation)

	const setConversation = async () => {

		try {
			const response = await get("/chat/conversation/" + ID)

			if (response.status === 200) {
				dispatch(setConversation(response.data))
			} else {
				console.log("Error al cargar conversación.")
			}
		} catch (error) {
			console.log(error)
		}
	}

	/* 
		useEffect(()=> {
			setConversation()
		}, [])
	*/

	//console.log(conversation)

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
				conversation.length > 0
				?
					<FlatList	
						data={items}
						inverted
						renderItem={({ item }) => <Balloon transmitter={item} />}
						keyExtractor={(item, id) => id}
						style={{ 
							width: "100%",
							marginTop: 0, 
							marginBottom: 10,
							overflow: "hidden"
						}}
					/>
				:
				<Text>Loading...</Text>
			}
			<Input />
		</View>
	)
}

export default Conversation
