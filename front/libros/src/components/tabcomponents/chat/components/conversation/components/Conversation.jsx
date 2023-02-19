//React
import React, { useState } from 'react'
import { View, ScrollView, FlatList } from "react-native"
//Components
import Balloon from './balloon/Balloon'
import Input from './input/Input'

const Conversation = () => {

	const items = [
		false,
		false,
		true,
		false,
		true,
		false,
		true
	]

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
			<FlatList
				data={items}
				inverted
				renderItem={({ item }) => <Balloon transmitter={item} />}
				keyExtractor={(item, id) => id}
				style={{ 
					width: "100%",
					marginTop: 25, 
					marginBottom: 10,
					overflow: "hidden"
				}}
			/>
			<Input />
		</View>
	)
}

export default Conversation
