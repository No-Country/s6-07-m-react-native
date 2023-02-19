//React
import React from 'react'
import {
    View,
    Text,
    FlatList
} from "react-native";
//Components
import EmptyChat from './emptyChat/EmptyChat';
import Conversation from './conversation/components/Conversation';
import ChatItem from "./chatItem/ChatItem"

const HistoryChat = () => {

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <View style={{ marginTop: 30 }}>
            {/* <EmptyChat /> */}
            {/* <Conversation /> */}
            {<FlatList
                data={items}
                renderItem={({ item }) => <ChatItem />}
                keyExtractor={item => item}
            />}
        </View>
    )
}

export default HistoryChat