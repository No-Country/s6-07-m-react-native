import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { REACT_APP_API_URI_NODE } from '@env'
import { alertToast } from '../utils/alertsUtils'
import { setBooks } from '../store/slices/books.slice'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

const useSearchBooks = () => {
	const dispatch = useDispatch()

	const books = useSelector(state => state)

	const [textInput, setTextInput] = useState('')
	const [filterSelect, setFilterSelect] = useState('')
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		newPage(1)
	}, [])

	const resetAll = () => {
		setCurrentPage(1)
		newPage(1)
	}

	const newPage = async page => {
		console.log('esto viene de new page', page)
		console.log('esto viene de newpage pero es currentpage', currentPage)
		setTextInput('')
		setFilterSelect('')
		setLoading(true)
		try {
			const response = await axios(
				`${REACT_APP_API_URI_NODE}/book/search?page=${page}&limit=20`
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
		if (filterSelect === '' || textInput === '') {
			return alertToast('info', 'ℹ️', 'No ingresaste ninguna informacion')
		}
		try {
			await axios(
				`${REACT_APP_API_URI_NODE}/book/search?${filterSelect}=${textInput}&page=1&limit=8`
			).then(response => {
				if (response.data.status === 200) {
					alertToast('success', '👍', 'Busqueda correcta')
					dispatch(setBooks(response.data.data))
					setLoading(false)
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
			console.log(nextPage)
			setLoading(false)
		}, 1500)
	}

	const renderFooter = () => {
		return loading ? (
			<View style={{ paddingVertical: 40 }}>
				<ActivityIndicator size='large' color='#BC624F' />
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
	}
}

export default useSearchBooks
