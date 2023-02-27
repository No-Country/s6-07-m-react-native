import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
import { Avatar } from '../components/tabcomponents/home'
import Conversation from '../components/tabcomponents/chat/components/conversation/components/Conversation'
import HistoryChat from '../components/tabcomponents/chat/components/HistoryChat'

const ChatStack = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen
                name='History'
                options={{ headerShown: false }}
                component={HistoryChat}
            /> */}
            <Stack.Screen
                name='Conversation'
                component={Conversation}
            />
        </Stack.Navigator>
    )
}

export default ChatStack