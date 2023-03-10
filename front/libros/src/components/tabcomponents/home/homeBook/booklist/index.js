import React, { useEffect } from 'react'
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	VirtualizedList,
} from 'react-native'
import BookCard from '../../bookCard/component/BookCard'
import { useSelector } from 'react-redux'
import useSearchBooks from '../../../../../hooks/useSearchBooks'
import { Ionicons } from '@expo/vector-icons'

const BooksList = () => {
	const books = useSelector(state => state)
	const {
		handleLoadMore,
		renderFooter,
		listRef,
		handleScrollToTop,
		showScrollToTopButton,
		handleScroll,
	} = useSearchBooks()

	const getItem = (data, index) => {
		return data[index]
	}

	const getItemCount = () => {
		return books?.books?.books?.length
	}

	const renderItem = ({ item }) => {
		return <BookCard book={item} />
	}

	return (
		<View>
			<TouchableOpacity onPress={handleScrollToTop}>
				{showScrollToTopButton && (
					<View
						style={{
							width: '100%',
							alignItems: 'center',
							position: 'relative',
							marginTop: -18,
							paddingBottom: 10,
						}}
					>
						<Ionicons name='caret-up-sharp' size={22} style={{}} />
					</View>
				)}
			</TouchableOpacity>
			<VirtualizedList
				data={books.books.books}
				getItem={getItem}
				getItemCount={getItemCount}
				renderItem={renderItem}
				keyExtractor={item => item._id}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.1}
				ListFooterComponent={renderFooter}
				ref={listRef}
				onScroll={handleScroll}
			/>
		</View>
	)
}

export default BooksList
