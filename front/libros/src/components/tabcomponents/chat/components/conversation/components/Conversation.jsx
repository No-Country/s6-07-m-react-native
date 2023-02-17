import React from 'react'
import {
    View,
    Text,
}from "react-native"

import { io } from "socket.io-client";

const Conversation = () => {

    const socket = io()

    
  return (
    <Text>Conversation</Text>
  )
}

export default Conversation