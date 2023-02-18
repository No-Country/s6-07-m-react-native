import React from 'react'
import {
    View,
    Text,
}from "react-native"
//Components
import Balloon from './balloon/Balloon';

import { io } from "socket.io-client";

const Conversation = () => {

    const socket = io()

  return (
    <View style={{backgroundColor: "white", height: "100%"}}>
      <Balloon transmitter={false} />
    </View>
  )
}

export default Conversation