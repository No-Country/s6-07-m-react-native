import { configureStore } from "@reduxjs/toolkit";
import user from './slices/user.slice'
import historyChat from "./slices/historyChat.slice"
import conversation from "./slices/conversation.slice"

export default configureStore({
    reducer: {
        user,
        historyChat,
        conversation,
    }
})