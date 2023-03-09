import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Platform,
	Pressable,
	Modal,
} from 'react-native'
import { styles } from './styles'
import {
	Book,
	Distance,
	Mapa,
	CustomModal,
} from './../../../../components/tabcomponents/home/index'
import { Reviews } from './../../../../components/tabcomponents/home/index'
import { books } from './../../../../../mocks/bookObj.json'
import { StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { REACT_APP_API_URI_NODE } from '@env'
import axios from 'axios'

const BookDetail = ({ navigation, book }) => {
	const books = useSelector(state => state)
	const route = useRoute()
	const { bookId } = route.params

	const [modalVisible, setModalVisible] = useState(false)
	const [bookInfo, setBookInfo] = useState({})

	useEffect(() => {
		const getInfoBook = async () => {
			try {
				const response = await axios.get(
					`${REACT_APP_API_URI_NODE}/book/detailBook/${bookId}`
				)
				setBookInfo(response.data.data)
			} catch (error) {
				console.log(error)
			}
		}
		getInfoBook()
	}, [])

	const onHandlePress = () => {
		setModalVisible(!modalVisible)
	}
	return (
		<SafeAreaView>
			<StatusBar backgroundColor='#6427FF' />
			<Book bookInfo={bookInfo} />
			<Distance />
			<View style={{ marginVertical: 60 }}>
				<Mapa />
			</View>
			<TouchableOpacity style={styles.button} onPress={onHandlePress}>
				<Text style={styles.text}>Solicitar</Text>
			</TouchableOpacity>
			<Modal visible={modalVisible} animationType='slide'>
				<CustomModal
					data={books}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					styles={styles}
				/>
			</Modal>
		</SafeAreaView>
	)
}

export default BookDetail
