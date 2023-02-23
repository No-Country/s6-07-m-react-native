import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user.slice'
import books from './slices/books.slice'

export default configureStore({
	reducer: {
		user,
		books,
	},
})
