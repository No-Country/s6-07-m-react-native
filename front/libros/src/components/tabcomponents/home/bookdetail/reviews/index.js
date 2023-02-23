import React from 'react'
import { View, Text, Image } from 'react-native'
import { styles } from './styles'

const Reviews = books => {
	const data = books.data

	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Image
					style={styles.avatar}
					source={require('./../../../../../../assets/avatar.jpeg')}
				/>
				<Text style={styles.textAvatar}>{data[0].author}</Text>
			</View>
			<View style={styles.reviewsContainer}>
				<Text style={styles.star}>⭐️</Text>
				<Text style={styles.textStar}>5.0 (1)</Text>
			</View>
		</View>
	)
}
export default Reviews
