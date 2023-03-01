import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import styles from './styles'

const Avatar = ({ image, navigation }) => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require('./../../../../../../assets/avatar.jpeg')}
			/>
		</View>
	)
}

export default Avatar
