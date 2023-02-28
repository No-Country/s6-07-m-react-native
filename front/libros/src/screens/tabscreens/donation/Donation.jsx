import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import FormNewArticle from './FormNewArticle'

const Donation = () => {
	return (
		<SafeAreaView
			style={{
				marginTop: 20,
			}}
		>
			<StatusBar backgroundColor='#6427FF' />
			<FormNewArticle />
		</SafeAreaView>
	)
}

export default Donation
