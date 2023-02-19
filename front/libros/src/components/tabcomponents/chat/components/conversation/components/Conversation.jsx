import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
}from "react-native"
//Components
import Balloon from './balloon/Balloon';
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import { REACT_APP_API_URI_GO } from '@env'
import {useSelector, useDispatch} from "react-redux";
import { setUser } from '../../../../../../store/slices/user.slice';

const socket = new WebSocket("ws://192.168.1.13:3007/ws")

const Conversation = () => {
	let [msg, setMsg] = useState([])

	const user = useSelector(state => state.user)
	const dispatch = useDispatch()
	console.log(user)

	useEffect(() => {
		socket.addEventListener("open", data => {
			socket.send("Hola servidor. Ya era hora que conectáramos >:(")
		})
	}, [])
	
	useEffect(() => {
		socket.addEventListener("message", data => {
			setMsg([data])
		})
	}, [])

	const submitMsg = () => {
		console.log('Send Message pressed.')
		socket.send(user.ID)
	}

	console.log('Message: ', msg)

	return (
		<View
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				width: '100%',
			}}
		>
			<TouchableWithoutFeedback
				onPress={submitMsg}
				style={{
					backgroundColor: 'gainsboro',
					padding: 10,
					borderWidth: 0.5,
				}}
			>
				<Text>Send Message</Text>
			</TouchableWithoutFeedback>
		</View>
	)
}

export default Conversation
