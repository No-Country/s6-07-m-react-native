import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import FormNewArticle from './FormNewArticle'

const Donation = () => {
	return (
		<View
			style={{
				marginTop: 60,
			}}
		>
			<StatusBar backgroundColor='#6427FF' />
			<FormNewArticle />
		</View>
	)
}

export default Donation
