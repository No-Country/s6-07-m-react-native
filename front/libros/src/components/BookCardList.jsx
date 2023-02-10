import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BookCardList = ({ book }) => {
	return (
		<View style={styles.viewStyle}>
			<Image style={{ width: 80, height: 125 }} source={{ uri: book.url }} />

			<View style={styles.containerInfo}>
				<Text>{book.title}</Text>
				<View style={styles.viewImg}>
					<Image
						source={{ uri: 'https://picsum.photos/200/300' }}
						style={{ width: 30, height: 30 }}
					/>
					<Text style={{ marginLeft: 8 }}>Name Usuario</Text>
					<Text style={{ marginLeft: 8 }}>Calificacion</Text>
				</View>
				<View style={styles.contact}>
					<Text style={{ marginRight: 15 }}>Distancia 15km</Text>
					<TouchableOpacity>
						<Text>Contacta</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewStyle: {
		marginTop: 5,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#cecece',
		borderRadius: 16,
		padding: 5,
	},
	containerInfo: {
		marginLeft: 8,
		marginVertical: 5,
	},
	viewImg: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 12,
	},
	contact: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 16,
	},
});

export default BookCardList;
