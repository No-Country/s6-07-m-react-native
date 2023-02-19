import Reac from 'react'
import {
	View,
	Text,
} from 'react-native'
import { styles } from './styles'

const CardReview = ({ data }) => {
	console.log(data)
	return (
		<View style={styles.cardReview}>
			<View style={styles.headerReview}>
				<Text style={styles.textUser}>{data.author}</Text>
				<Text style={styles.textStar}>⭐️⭐️⭐️⭐️⭐️ 5.0</Text>
			</View>
			<View style={styles.containerText}>
				<Text style={styles.textReview}>{data.description}</Text>
			</View>
		</View>
	)
}

export default CardReview;
