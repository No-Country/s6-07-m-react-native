import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'

import bookObj from '../../../../../../mocks/bookObj.json'

const Book = ({ bookInfo }) => {
	const Detail = props => {
		console.log(bookInfo)
		return (
			<View style={styles.containerBook}>
				<View style={styles.bookcontainer}>
					<Image source={{ uri: bookInfo?.image }} style={styles.image} />
					<Text style={styles.textTitle}> {bookInfo?.title}</Text>
				</View>
				<Text style={styles.textDescription}>
					{bookInfo?.description?.substring(0, 200).concat('...')}
				</Text>
			</View>
		)
	}
	return (
		<View style={styles.container}>
			<Detail data={bookObj} />
		</View>
	)
}

export default Book
