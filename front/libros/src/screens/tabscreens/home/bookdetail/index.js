import React, { useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Platform,
	Pressable,
} from 'react-native'
import { styles } from './styles'
import {
	Book,
	Distance,
	Mapa,
} from './../../../../components/tabcomponents/home/index'
import { Reviews } from './../../../../components/tabcomponents/home/index'
import { books } from './../../../../../mocks/bookObj.json'
import { StatusBar } from 'react-native'

const BookDetail = ({ navigation }) => {
	return (
		<SafeAreaView>
			<StatusBar backgroundColor='#FF3D45' />
			<Book />
			<Reviews data={books} />
			<Distance />
			<Mapa />
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('BookDetail')}
			>
				<Text style={styles.text}>Solicitar</Text>
			</TouchableOpacity>

		</SafeAreaView>
	)
}

export default BookDetail
