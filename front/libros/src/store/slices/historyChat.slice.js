import { createSlice } from '@reduxjs/toolkit'

let initialState = {
	historyChat: [],
	status: "idle",
	error: null,
	conversation: [],
	lastMessage: "",
}

const historyChat = createSlice({
	name: 'historyChat',
	initialState,
	reducers: {
		setHistoryChat: (state, action) => action.payload,
	},
})

export const { setHistoryChat } = historyChat.actions

export default historyChat.reducer