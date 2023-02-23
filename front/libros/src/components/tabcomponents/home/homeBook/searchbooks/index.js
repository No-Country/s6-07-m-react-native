import React, { useEffect } from 'react'
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
import useSearchBooks from '../../../../../hooks/useSearchBooks'

const SearchBooks = () => {
	const {
		textInput,
		setTextInput,
		filterSelect,
		setFilterSelect,
		handleSearch,
		getAllBooks,
	} = useSearchBooks()

	useEffect(() => {
		getAllBooks()
	}, [])

	return (
		<View style={{ marginBottom: 16 }}>
			<View style={styles.directionView}>
				<Image
					source={{ uri: 'https://picsum.photos/200/300' }}
					style={styles.imgLogo}
				/>
				<Text style={styles.text}>Encuentra tu libro</Text>
			</View>
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
				<TouchableOpacity
					onPress={getAllBooks}
					style={[
						styles.button,
						{
							backgroundColor:
								filterSelect === '' ? colors.primary : colors.secondary,
						},
					]}
				>
					<Text style={styles.textButton}>Todos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFilterSelect('title')}
					style={[
						styles.button,
						{
							backgroundColor:
								filterSelect === 'title' ? colors.primary : colors.secondary,
						},
					]}
				>
					<Text style={styles.textButton}>Titulos</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFilterSelect('editorial')}
					style={[
						styles.button,
						{
							backgroundColor:
								filterSelect === 'editorial'
									? colors.primary
									: colors.secondary,
						},
					]}
				>
					<Text style={styles.textButton}>Editorial</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setFilterSelect('author')}
					style={[
						styles.button,
						{
							backgroundColor:
								filterSelect === 'author' ? colors.primary : colors.secondary,
						},
					]}
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
		backgroundColor: colors.secondary,
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
