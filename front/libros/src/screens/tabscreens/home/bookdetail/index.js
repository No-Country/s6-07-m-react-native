import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { Book } from './../../../../components/tabcomponents/home/index';

const BookDetail = ({ navigation }) => {
	return (
		<SafeAreaView>
			<Book />

			<View style={styles.container}>
				<Text style={styles.text}>Book</Text>
			</View>
		</SafeAreaView>
	);
};

export default BookDetail;
