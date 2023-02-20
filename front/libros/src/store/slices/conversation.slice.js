import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const conversation = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setConversation: (state, action) => action.payload,
	},
});

export const { setConversation } = conversation.actions

export default conversation.reducer