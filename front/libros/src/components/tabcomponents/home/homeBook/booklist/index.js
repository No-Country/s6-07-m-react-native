import React from 'react'
import { FlatList, VirtualizedList } from 'react-native'
import BookCard from '../../bookCard/component/BookCard'
import { useSelector } from 'react-redux'

const BooksList = () => {
	const books = useSelector(state => state)
	

	return (
		<FlatList
			data={books.books.books}
			renderItem={({ item }) => <BookCard book={item} />}
			keyExtractor={item => item._id}
		/>
	)
}

export default BooksList