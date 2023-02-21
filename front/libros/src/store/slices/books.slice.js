import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const books = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setBooks: (state, action) => action.payload,
	},
})

export const { setBooks } = books.actions

export default books.reducer
