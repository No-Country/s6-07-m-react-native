import React, { useEffect, useState } from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../../../../../utils/constants'
import axios from 'axios'
import { REACT_APP_API_URI_NODE } from '@env'
<<<<<<< HEAD
import { useSelector, useDispatch } from 'react-redux'
import { setBooks } from '../../../../../store/slices/books.slice';
import HeaderComponent 	from '../../../../headerComponent';

=======
import { useDispatch } from 'react-redux'
import { setBooks } from '../../../../../store/slices/books.slice'
import { alertToast } from '../../../../../utils/alertsUtils'
>>>>>>> 98022618071047bbd372dab253629e724546d62e

const SearchBooks = () => {
	const dispatch = useDispatch()
	const [textInput, setTextInput] = useState('')
	const [filterSelect, setFilterSelect] = useState('')

	useEffect(() => {
		getAllBooks()
	}, [])

	const getAllBooks = async () => {
		try {
			await axios(`${REACT_APP_API_URI_NODE}/book/search`).then(response =>
				dispatch(setBooks({ ...response.data.data }))
			)
		} catch (error) {
			console.log(error)
		}
		setTextInput('')
		setFilterSelect('')
	}

	const handleSearch = async () => {
		if (filterSelect === '' || textInput === '') {
			return alertToast('info', 'ℹ️', 'No ingresaste ninguna informacion')
		}
		try {
			await axios(
				`${REACT_APP_API_URI_NODE}/book/search?${filterSelect}=${textInput}`
			).then(response => {
				if (response.data.status === 200) {
					alertToast('success', '👍', 'Busqueda correcta')
					dispatch(setBooks({ ...response.data.data }))
				}
			})
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alertToast('error', '❌', 'No se encontraron resultados')
			}
		}
		setTextInput('')
		setFilterSelect('')
	}

	return (
		<View style={{ marginBottom: 16 }}>
			<HeaderComponent right={true} title={"Encuentra tu libro"} />

			{/* <View style={styles.directionView}>
				<Image
					source={{ uri: 'https://picsum.photos/200/300' }}
					style={styles.imgLogo}
				/>
				<Text style={styles.text}>Encuentra tu libro</Text>
			</View> */}
			<View style={styles.textInput}>
				<TextInput
					onChangeText={text => setTextInput(text)}
					placeholder='Buscar'
					style={styles.input}
					value={textInput}
				/>
				<TouchableOpacity onPress={handleSearch}>
					<Ionicons
						style={{ marginRight: 16 }}
						name='search-outline'
						size={24}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.directionButtons}>
				<TouchableOpacity onPress={getAllBooks} style={styles.button}>
					<Text style={styles.textButton}>Todos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFilterSelect('title')}
					style={styles.button}
				>
					<Text style={styles.textButton}>Titulos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFilterSelect('editorial')}
					style={styles.button}
				>
					<Text style={styles.textButton}>Editorial</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFilterSelect('author')}
					style={styles.button}
				>
					<Text style={styles.textButton}>Autor</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	imgLogo: {
		height: 40,
		width: 40,
		borderRadius: 20,
	},
	directionView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 18,
		marginRight: 50,
		marginVertical: 14,
	},
	input: {
		height: 40,
		width: '100%',
		margin: 4,
		padding: 10,
	},
	text: {
		fontSize: 18,
		fontWeight: '500',
		marginLeft: 23,
	},
	textButton: {
		fontSize: 12,
		fontWeight: '500',
		textAlign: 'center',
		color: colors.background,
	},
	directionButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	button: {
		alignItems: 'center',
		backgroundColor: colors.primary,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: colors.primary,
		width: 72,
		height: 32,
		borderRadius: 10,
		padding: 8,
	},
})

export default SearchBooks
