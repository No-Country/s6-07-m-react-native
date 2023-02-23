import { createSlice } from '@reduxjs/toolkit'

const initialState = true

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
	},
})

export const { setUser } = user.actions

export default user.reducer
