import React from 'react';
import { Button, Text, View } from 'react-native';

const HomeBooks = ({navigation}) => {
	return (
		<View>
			<Text>HomeBooks navigation</Text>
			<Button title='Go to HomeDetail' onPress={() => navigation.navigate('HomeDetail')} />
		</View>
	);
};

export default HomeBooks;
