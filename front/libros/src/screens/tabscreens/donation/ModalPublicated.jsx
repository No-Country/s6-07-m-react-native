import React from 'react';
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import CircleGreen from './svg/CircleGreen';
import HandOkay from './svg/HandOkay';

const ModalPublicated = ({ modalVisible = false, setModalVisible }) => {
	return (
		<Modal
			style={styles.modal}
			animationType='fade'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
		>
			<View style={styles.modal}>
				<CircleGreen />
				<Text style={{ fontSize: 24, fontWeight: '500', marginVertical: 5 }}>
					Gracias por publicar tu libro!
				</Text>
				<HandOkay />
				<TouchableOpacity
					style={{ marginTop: 30 }}
					onPress={() => setModalVisible(!modalVisible)}
				>
					<Text>Cerrar modal</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		width: 271,
		height: 330,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 20,
		backgroundColor: '#f1ebf1',
		alignItems: 'center',
		paddingTop: 30,
	},
});

export default ModalPublicated;
