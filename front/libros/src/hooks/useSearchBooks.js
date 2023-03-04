import axios from 'axios'
import { REACT_APP_API_URI_NODE } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { alertToast } from '../utils/alertsUtils'
import { setBooks } from '../store/slices/books.slice'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const useSearchBooks = () => {
	const dispatch = useDispatch()

	const books = useSelector(state => state)

	const listRef = useRef(null)

	const [textInput, setTextInput] = useState('')
	const [filterSelect, setFilterSelect] = useState('')
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false)

	let token = 0
	const getTokenAndLoad = async () => {
		try {
			token = await AsyncStorage.getItem('token')
			console.log(token, 'get token')
			if (token) {
				return token
			} else {
				alertToast('error', '❌', 'No se encontró el token de autenticación')
			}
		} catch (error) {
			alertToast('error', '❌', 'No se pudo obtener el token de autenticación')
		}
	}

	const handleScroll = event => {
		const offsetY = event.nativeEvent.contentOffset.y
		if (offsetY > 4 * 100) {
			setShowScrollToTopButton(true)
		} else {
			setShowScrollToTopButton(false)
		}
	}

	const handleScrollToTop = () => {
		listRef.current.scrollToIndex({ index: 0 })
	}

	const resetAll = () => {
		setCurrentPage(1)
		newPage(1)
	}

	const newPage = async page => {
		setTextInput('')
		setFilterSelect('')
		setLoading(true)
		const a = await getTokenAndLoad()
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${a}`,
				},
			}
			const response = await axios(
				`${REACT_APP_API_URI_NODE}/book/search?page=${page}&limit=100`,
				config
			)
			if (page === 1) {
				setLoading(false)
				return dispatch(setBooks(response.data.data))
			}
			if (page !== 1) {
				dispatch(setBooks(response.data.data))
				setLoading(false)
			}
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alertToast('info', 'ℹ️', 'Estos son todos los libros!')
			}
		}
	}

	const handleSearch = async () => {
		setLoading(true)
		const a = await getTokenAndLoad()
		console.log(a, 'Token')
		if (filterSelect === '' || textInput === '') {
			return alertToast('info', 'ℹ️', 'No ingresaste ninguna informacion')
		}
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${a}`,
				},
			}
			const response = await axios.get(
				`${REACT_APP_API_URI_NODE}/book/search?${filterSelect}=${textInput}&page=1&limit=8`,
				config
			)

			if (response.data.status === 200) {
				alertToast('success', '👍', 'Busqueda correcta')
				dispatch(setBooks(response.data.data))
				setLoading(false)
			}
		} catch (error) {
			console.log(error, 'Error busqueda')
			if (error.response && error.response.status === 404) {
				alertToast('error', '❌', 'No se encontraron resultados')
			}
		}
		setTextInput('')
		setFilterSelect('')
	}
	const handleLoadMore = () => {
		setLoading(true)
		if (
			books.books.pagination.currentPage === books.books.pagination.totalPages
		) {
			setLoading(false)
			return alertToast('info', 'ℹ️', 'Estas en la ultima pagina')
		}
		setTimeout(() => {
			const nextPage = currentPage + 1
			newPage(2)
			setCurrentPage(nextPage)
			setLoading(false)
		}, 1500)
	}

	const renderFooter = () => {
		return loading ? (
			<View style={{ paddingVertical: 40 }}>
				<ActivityIndicator size='large' color='red' />
			</View>
		) : null
	}

	return {
		textInput,
		setTextInput,
		filterSelect,
		setFilterSelect,
		handleSearch,
		handleLoadMore,
		newPage,
		renderFooter,
		resetAll,
		listRef,
		handleScrollToTop,
		showScrollToTopButton,
		handleScroll,
		newPage,
	}
}

export default useSearchBooks
