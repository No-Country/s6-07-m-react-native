//React
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, Image, View, TouchableWithoutFeedback } from 'react-native'
//Icons
import { Ionicons } from '@expo/vector-icons'
//Styles
import { styles } from '../styles/styles'
import { colors } from '../../../../../utils/constants'
//Components
import Avatar from '../../bookdetail/avatar'
//Redux
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from '../../../../../store/slices/books.slice'

const BookCard = ({ book }) => {
	let [author, setAuthor] = useState('')
	const { navigate } = useNavigation()

  const dispatch = useDispatch()
  const books = useSelector(state => state.books)
  const user = useSelector(state => state.user)

	const trimAuthor = author => {
		return author?.length > 8
			? setAuthor(author?.substring(0, 10) + '...')
			: setAuthor(author)
	}

  const selectBook = () => {
    const data = {
      users: [ user.ID, book.userId ],
      bookId: book._id,
    }

    dispatch(setBooks({
      ...books,
      bookSelected: book
    }))
  }

	useEffect(() => {
		trimAuthor(book.author)
	}, [])

  return (
    <TouchableWithoutFeedback 
      onPress={() => {
        selectBook()
        navigate('BookDetail')
        }}
    >
      <View style={styles.container}>
        <Image
          style={{ width: 80, height: 125 }}
          source={{ uri: book.image }}
        />

				<View style={styles.infoContainer}>
					<View>
						<Text style={styles.title}>{book.title.substring(0, 20)}</Text>

						<View style={styles.authorContainer}>
							<View style={styles.avatarContainer}>
								<Avatar />
								<Text style={styles.authorTitle}>{author}</Text>
							</View>

							<View style={styles.avgContainer}>
								<Ionicons
									style={styles.star}
									name='star'
									size={14}
									color={colors.warning}
								/>
								<Text style={styles.contact}>4.3</Text>
							</View>
						</View>
					</View>

					<View style={styles.contactContainer}>
						<View style={styles.locationContainer}>
							<Ionicons
								name='location-outline'
								size={15}
								color={colors.auxiliar}
							/>
							<Text style={styles.contact}>15km</Text>
						</View>

						<View style={styles.locationContainer}>
							<Ionicons name='mail-outline' size={15} color={colors.auxiliar} />
							<Text style={styles.contact}>Contacta</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default BookCard
