import React, { useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Platform,
	Pressable,
	Modal
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

	const [modalVisible, setModalVisible] = React.useState(false)
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
<<<<<<< Updated upstream
=======
			<Modal visible={modalVisible} animationType='slide'>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>¿Desea solicitar este libro?</Text>
						<View style={styles.buttonContainer}>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.textStyle}>Cancelar</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
>>>>>>> Stashed changes
		</SafeAreaView>
	)
}

export default BookDetail;
