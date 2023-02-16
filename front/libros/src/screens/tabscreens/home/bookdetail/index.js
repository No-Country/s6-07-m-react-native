import React, { useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	Platform,
} from 'react-native';
import { styles } from './styles';
import {
	Book,
	Distance,
	Mapa,
} from './../../../../components/tabcomponents/home/index';
import { Reviews } from './../../../../components/tabcomponents/home/index';
import { books } from './../../../../../mocks/bookObj.json';
import { StatusBar } from 'react-native';

const BookDetail = ({ navigation }) => {
	useEffect(() => {
		Platform.OS === 'android' && StatusBar.setBackgroundColor('#ffffff');
		
	}, []);

	return (
		<SafeAreaView>
			<StatusBar backgroundColor='#FF3D45' />
			<Book />
			<Reviews data={books} />
			<Distance />
			<Mapa />

			<View style={styles.container}>
				<Text style={styles.text}>Book</Text>
			</View>
		</SafeAreaView>
	);
};

export default BookDetail;
