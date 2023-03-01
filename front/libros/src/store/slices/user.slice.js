import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	state: "idle",
	error: null,
	token: "",
}

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
	},
})

export const getToken = (state) => state?.user?.token 

export const { setUser } = user.actions

export default user.reducer
