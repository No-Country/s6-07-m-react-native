import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import {
	BookList,
	SearchBooks,
} from '../../../../components/tabcomponents/home/index'

const HomeBooks = () => {
	return (
		<View style={styles.container}>
			<SearchBooks />
			<BookList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60,
		marginHorizontal: 16,
	},
})

export default HomeBooks
