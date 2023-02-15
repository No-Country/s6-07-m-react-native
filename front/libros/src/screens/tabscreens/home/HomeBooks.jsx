import React from 'react';
import { Button, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import BooksList from '../../../components/BooksList';
import SearchBooks from '../../../components/SearchBooks';

const HomeBooks = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ marginHorizontal: 16 }}>
				<SearchBooks />
			</View>
			<View style={{ marginLeft: 10, marginRight: 5, height: "73%" }}>
				<BooksList />
			</View>
			{/* <Button
				title='Go to HomeDetail'
				onPress={() => navigation.navigate('HomeDetail')}
			/> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 56,
		marginBottom: 40,
	},
});

export default HomeBooks;
