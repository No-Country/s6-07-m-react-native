import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	conversation: [],
	status: "idle"
}

const conversation = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setConversation: (state, action) => action.payload,
	},
});

export const { setConversation } = conversation.actions

export default conversation.reducer