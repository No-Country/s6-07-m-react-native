import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookCardList = ({ book }) => {
	return (
		<View style={styles.viewStyle}>
			<TouchableOpacity
				onPress={() => console.log('Te lleva al detalle del libro')}
			>
				<Image style={{ width: 80, height: 125 }} source={{ uri: book.url }} />
			</TouchableOpacity>

			<View style={styles.containerInfo}>
				<Text>{book.title}</Text>
				<View style={styles.viewImg}>
					<Image
						source={{ uri: 'https://picsum.photos/200/300' }}
						style={{ width: 30, height: 30 }}
					/>
					<Text style={{ marginLeft: 8, marginRight: 20 }}>Name Usuario</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons size={16} color='#FFB168' name='star' />
						<Text style={{ marginLeft: 2 }}>5.0</Text>
					</View>
				</View>
				<View style={styles.contact}>
					<View style={{ flexDirection: 'row', marginTop: 10 }}>
						<Ionicons color='#4667D7' size={18} name='location-outline' />
						<Text style={{ marginRight: 20 }}>Distancia 15km</Text>
						<TouchableOpacity
							style={{ flexDirection: 'row', alignItems: 'center' }}
							onPress={() =>
								console.log(
									'Te lleva al chat con la persona que publico el libro'
								)
							}
						>
							<Ionicons color='#4667D7' size={18} name='mail-outline' />
							<Text>Contacta</Text>
						</TouchableOpacity>
					</View>
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
		width: '100%',
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
		width: '100%',
		borderStyle: 'dashed',
		borderTopWidth: 1,
		borderTopColor: '#4667D7',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 16,
	},
});

export default BookCardList;
