import React from 'react'
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import CircleGreen from './svg/CircleGreen'
import HandOkay from './svg/HandOkay'
import { Ionicons } from '@expo/vector-icons'

const ModalPublicated = ({ modalVisible = false, setModalVisible }) => {
	return (
		<Modal
			style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}
			animationType='fade'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible)
			}}
		>
			<View style={styles.modal}>
				<TouchableOpacity
					style={{ left: 110, bottom: 15 }}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<Ionicons name='close-circle' size={30} />
				</TouchableOpacity>
				<CircleGreen />
				<Text style={{ fontSize: 24, fontWeight: '500', marginVertical: 10 }}>
					Gracias por {'\n'}publicar tu libro!
				</Text>
				<HandOkay />
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modal: {
		marginLeft: '18%',
		marginTop: 120,
		maxWidth: 271,
		height: 330,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 20,
		backgroundColor: '#f1ebf1',
		alignItems: 'center',
		paddingTop: 20,
	},
})

export default ModalPublicated
