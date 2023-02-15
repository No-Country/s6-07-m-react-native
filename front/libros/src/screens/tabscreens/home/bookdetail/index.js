import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { Book } from './../../../../components/tabcomponents/home/index';
import { Reviews } from './../../../../components/tabcomponents/home/index';
import {books} from './../../../../../mocks/bookObj.json'

const BookDetail = ({ navigation }) => {
	console.log(books)

	return (
		<SafeAreaView>
			<Book />
			<Reviews data={books}/>


			<View style={styles.container}>
				<Text style={styles.text}>Book</Text>
			</View>
		</SafeAreaView>
	);
};

export default BookDetail;
