import axios from 'axios'
import { REACT_APP_API_URI_NODE } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { alertToast } from '../utils/alertsUtils'
import { setBooks } from '../store/slices/books.slice'
import { useEffect, useState } from 'react'

const useSearchBooks = () => {
	const dispatch = useDispatch()

	const books = useSelector(state => state)

	const [textInput, setTextInput] = useState('')
	const [filterSelect, setFilterSelect] = useState('')
	const [page, setPage] = useState(1)
	console.log('pagina numero', page)

	useEffect(() => {
		getAllBooks()
	}, [])

	const handleLoadMore = () => {
		console.log('load more dawn')
		newPage(page + 1)
	}

	const getAllBooks = () => {
		setTextInput('')
		setFilterSelect('')
		newPage(1)
	}

	const newPage = async page => {
		try {
			setPage(page)
			const response = await axios(
				`${REACT_APP_API_URI_NODE}/book/search?page=${page}`
			)
			const newData = response.data.data
			if (page === 1) {
				return dispatch(setBooks(newData))
			}
			dispatch(setBooks({ ...books, ...newData }))
		} catch (error) {
			if (error.response && error.response.status === 404) {
				alertToast('info', 'ℹ️', 'Estos son todos los libros!')
			}
		}
	}

	const handleSearch = async () => {
		if (filterSelect === '' || textInput === '') {
			return alertToast('info', 'ℹ️', 'No ingresaste ninguna informacion')
		}
		try {
			await axios(
				`${REACT_APP_API_URI_NODE}/book/search?${filterSelect}=${textInput}&page=${page}`
			).then(response => {
				if (response.data.status === 200) {
					alertToast('success', '👍', 'Busqueda correcta')
					dispatch(setBooks(response.data.data))
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

	return {
		textInput,
		setTextInput,
		filterSelect,
		setFilterSelect,
		handleSearch,
		getAllBooks,
		handleLoadMore,
		page,
		newPage,
		setPage,
	}
}

export default useSearchBooks
