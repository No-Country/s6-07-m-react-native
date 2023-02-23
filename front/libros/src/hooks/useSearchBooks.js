import axios from 'axios'
import { REACT_APP_API_URI_NODE } from '@env'
import { useDispatch } from 'react-redux'
import { alertToast } from '../utils/alertsUtils'
import { setBooks } from '../store/slices/books.slice'
import { useState } from 'react'

const useSearchBooks = () => {
	const dispatch = useDispatch()

	const [textInput, setTextInput] = useState('')
	const [filterSelect, setFilterSelect] = useState('')

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

	return {
		textInput,
		setTextInput,
		filterSelect,
		setFilterSelect,
		handleSearch,
		getAllBooks,
	}
}

export default useSearchBooks
