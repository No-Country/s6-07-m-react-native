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
		/* setState: (state, action) => {
			state.conversation: {action.payload, state: "idle"}
		} */
	},
});

export const { setConversation/* , setState */ } = conversation.actions

export default conversation.reducer