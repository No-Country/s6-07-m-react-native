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
			<View style={styles.list}>
				<BookList />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60,
		marginHorizontal: 16,
	},
	list: {
		flex: 1,
		marginTop: 20,
		marginHorizontal: 16,
		paddingBottom: 10,
	},
})

export default HomeBooks
