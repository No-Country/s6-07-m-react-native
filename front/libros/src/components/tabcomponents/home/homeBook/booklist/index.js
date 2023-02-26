import React, { useEffect } from 'react'
import { FlatList, VirtualizedList } from 'react-native'
import BookCard from '../../bookCard/component/BookCard'
import { useSelector } from 'react-redux'
import useSearchBooks from '../../../../../hooks/useSearchBooks'

const BooksList = () => {
	const books = useSelector(state => state)

	const { handleLoadMore, renderFooter } = useSearchBooks()

	return (
		<FlatList
			data={books.books.books}
			renderItem={({ item }) => <BookCard book={item} />}
			keyExtractor={item => item._id}
			onEndReached={handleLoadMore}
			onEndReachedThreshold={0.1}
			ListFooterComponent={renderFooter}
		/>
	)
}

export default BooksList
