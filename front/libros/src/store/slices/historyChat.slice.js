import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	historyChat: [],
	state: "idle",
}

const historyChat = createSlice({
	name: 'historyChat',
	initialState,
	reducers: {
		setHistoryChat: (state, action) => action.payload,
	},
});

export const { setHistoryChat } = historyChat.actions

export default historyChat.reducer