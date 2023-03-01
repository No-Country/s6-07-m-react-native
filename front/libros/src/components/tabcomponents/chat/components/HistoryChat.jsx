//React
import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
//Components
import EmptyChat from './emptyChat/EmptyChat'
import ChatItem from './chatItem/ChatItem'
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { setHistoryChat } from "../../../../store/slices/historyChat.slice"
//Axios
import { get } from "../../../../utils/apiUtils";
//Alerts
import { alertToast } from '../../../../utils/alertsUtils'
//Spinner
import Spinner from "../../../spinner/Spinner"

const HistoryChat = () => {

    const dispatch = useDispatch()
    const historyChat = useSelector(state => state.historyChat)
    const {user} = useSelector(state => state.user)
    let [spinner, setSpinner] = useState("none")

    const dispatchHistoryChat = async () => {

        try {
            setSpinner("flex")

            const response = await get("/chat/history/" + user.ID)

            const {
                data: { chats },
                ok,
                status
            } = response

            if (ok) {
                setSpinner("none")
                dispatch(setHistoryChat({
                    ...historyChat,
                    historyChat: chats,
                    status: "succeded",
                }))
            } else {
                setSpinner("none")
                alertToast(
                    "error",
                    status,
                    "Ocurrió un error. Intenta nuevamente."
                )
            }
        } catch (error) {
            setSpinner("none")
            alertToast(
                "error",
                error,
                "Ocurrió un error. Intenta nuevamente."
            )
            console.log("Catch error: ", error)
        }
    }

    useEffect(() => {
        dispatchHistoryChat()
    }, [historyChat.status === "idle"])

    return (
        <View style={{ marginTop: 30 }}>
            {
                historyChat?.historyChat?.length > 0
                    ?
                    <FlatList
                        data={historyChat.historyChat}
                        renderItem={({ item }) => <ChatItem item={item} />}
                        keyExtractor={item => item.ChatID}
                    />
                    :
                    <EmptyChat />
            }
            <Spinner display={spinner} />
        </View>
    )
}

export default HistoryChat