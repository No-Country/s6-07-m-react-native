import React from 'react'
import { FlatList } from 'react-native'
import bookObj from '../../../../../../mocks/bookObj.json'
import BookCard from '../../bookCard/component/BookCard'

const BooksList = () => {
	return (
		<FlatList
			data={bookObj.books}
			renderItem={({ item }) => <BookCard book={item} />}
			keyExtractor={item => item.isbn}
		/>
	)
}

export default BooksList