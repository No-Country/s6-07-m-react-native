import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

import bookObj from '../../../../../../mocks/bookObj.json';

const Book = ({ navigation }) => {
	const Detail = props => {
		return (
			<View style={styles.containerBook}>
				<View style={styles.bookcontainer}>
					<Image source={{ uri: bookObj.books[0].url }} style={styles.image} />
					<Text style={styles.textTitle}> {bookObj.books[0].title}</Text>
				</View>
				<Text style={styles.textDescription}>{bookObj.books[0].description.substring(0,200).concat("...")}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Detail data={bookObj} />
		
		</View>
	);
};

export default Book;
