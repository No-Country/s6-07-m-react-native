import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBooks = () => {
	return (
		<View style={{ marginBottom: 16 }}>
			<View style={styles.directionView}>
				<Image
					source={{ uri: 'https://picsum.photos/200/300' }}
					style={styles.imgLogo}
				/>
				<Text style={styles.text}>Encuentra tu libro</Text>
			</View>
			<View style={styles.textInput}>
				<TextInput placeholder='Buscar' style={styles.input} ri />
				<Ionicons style={{ marginRight: 16 }} name='search-outline' size={24} />
			</View>
			<View style={styles.directionButtons}>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.textButton}>Todos</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.textButton}>Titulos</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.textButton}>Editorial</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.textButton}>Autor</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	imgLogo: {
		height: 40,
		width: 40,
		borderRadius: 20,
	},
	directionView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 8,
		marginVertical: 14,
	},
	input: {
		height: 40,
		margin: 4,
		padding: 10,
	},
	text: {
		fontSize: 18,
		fontWeight: '500',
		marginLeft: 23,
	},
	textButton: {
		fontSize: 12,
		fontWeight: '500',
		textAlign: 'center',
		color: '#908F9D',
	},
	directionButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#f5ced0',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#EF797D',
		width: 72,
		height: 32,
		borderRadius: 10,
		padding: 8,
	},
});

export default SearchBooks;
