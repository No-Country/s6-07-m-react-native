import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user.slice'
import historyChat from "./slices/historyChat.slice"
import conversation from "./slices/conversation.slice"
import books from './slices/books.slice'

export default configureStore({
    reducer: {
        user,
        books,
        historyChat,
        conversation,
    }
})
