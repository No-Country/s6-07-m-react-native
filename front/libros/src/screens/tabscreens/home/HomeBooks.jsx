import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const HomeBooks = ({navigation}) => {
	return (
		<View style={styles.container}>
			<Text>HomeBooks</Text>
			<Button title='Go to HomeDetail' onPress={() => navigation.navigate('HomeDetail')} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


export default HomeBooks;
