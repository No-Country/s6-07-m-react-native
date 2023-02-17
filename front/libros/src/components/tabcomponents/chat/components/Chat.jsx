//React
import React from 'react'
import {
    View,
    Text
} from "react-native";
//Components
import EmptyChat from './emptyChat/EmptyChat';
import Conversation from './conversation/components/Conversation';

const Chat = () => {
    return (
        <View>
            {/* <EmptyChat /> */}
            <Conversation />
        </View>
    )
}

export default Chat