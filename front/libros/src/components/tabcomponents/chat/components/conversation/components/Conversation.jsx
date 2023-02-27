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
	const conversation = useSelector(state => state.conversation)
	let [spinner, setSpinner] = useState("none")

	const setConversation = async () => {

		try {
			setSpinner("flex")
			
			const response = await get("/chat/conversation/" + ID)
			
			if (response.status === 200) {
				setSpinner("none")
				dispatch(setConversation(response.data))
			} else {
				setSpinner("none")
				console.log("Error al cargar conversación.")
			}
		} catch (error) {
			setSpinner("none")
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
				!conversation.length > 0
				?
					<FlatList	
						data={items}
						inverted
						renderItem={({ item }) => <Balloon transmitter={item} msg={"hola"} />}
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