import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import {
	BookList,
	SearchBooks,
} from '../../../../components/tabcomponents/home/index'

const HomeBooks = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ marginHorizontal: 16 }}>
				<SearchBooks />
			</View>
			<View style={{ marginLeft: 10, marginRight: 5 }}>
				<BookList />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 56,
		marginBottom: 12,
	},
})

export default HomeBooks
