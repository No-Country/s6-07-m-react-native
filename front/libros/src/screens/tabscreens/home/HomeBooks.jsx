import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import SearchBooks from '../../../components/SearchBooks';

const HomeBooks = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<SearchBooks />
			<BooksList />
			<Button
				title='Go to HomeDetail'
				onPress={() => navigation.navigate('HomeDetail')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 16,
		marginTop: 56,
	},
});

export default HomeBooks;
