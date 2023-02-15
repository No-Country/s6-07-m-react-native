import React from 'react';
import { FlatList } from 'react-native';
import bookObj from '../../mocks/bookObj.json';
import BookCardList from './BookCardList';

const BooksList = () => {
	return (
		<FlatList
			data={bookObj.books}
			renderItem={({ item }) => <BookCardList book={item} />}
			keyExtractor={item => item.isbn}
		/>
	);
};

export default BooksList;
