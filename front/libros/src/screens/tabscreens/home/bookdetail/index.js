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

const BookDetail = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false)

	const onHandlePress = () => {
		setModalVisible(!modalVisible)
	}
	return (
		<SafeAreaView>
			<StatusBar backgroundColor='#6427FF' />
			<Book />
			<Reviews data={books} />
			<Distance />
			<Mapa />
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
