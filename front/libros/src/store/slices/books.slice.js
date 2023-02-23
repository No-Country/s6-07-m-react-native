import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    books: [],
    status: 'idle',
    error: null,
    bookSelected: null
}

const books = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => action.payload,
    },
})

export const { setBooks } = books.actions

export const bookSelected = (state) => state.books.bookSelected

export default books.reducer
