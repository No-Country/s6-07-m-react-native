//React
import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableHighlight
} from "react-native"
//styles
import { styles } from './styles'
//Icons
import { Ionicons } from '@expo/vector-icons'
//constants
import { colors } from '../../../../../../../utils/constants'
//Variables
import { REACT_APP_WEBSOCKET_URI } from "@env"
//Redux
import { useSelector } from "react-redux"
//Emojis
import EmojiPicker from 'rn-emoji-keyboard'

const Input = () => {

    //const socket = new WebSocket(REACT_APP_WEBSOCKET_URI)

    const [isOpen, setIsOpen] = useState(false)
    let [showKeyboard, setShowKeyboard] = useState(true)

    let [msg, setMsg] = useState([])
    const user = useSelector(state => state.user)
    const inputRef = useRef()

    console.log(user)

    /* useEffect(() => {
        socket.addEventListener("open", () => {
            socket.send("Hola servidor. Ya era hora que conectáramos >:(")
        })

        Keyboard.isVisible(true)
    }, [])

    useEffect(() => {
        socket.addEventListener("message", data => {
            setMsg([data])
        })
    }, []) */

    const submitMsg = () => {
        console.log('Send Message pressed.')
        socket.send(user.ID)
    }

    console.log('Message: ', msg)

    const toggleKeyboardType = () => {
        setIsOpen(!isOpen)
        setShowKeyboard(false)
    }

    /* useEffect(()=> {
        //Keyboard.addListener("keyboardDidHide", ()=> inputRef.current.blur())
        inputRef.current.focus()
    }, []) */

    return (
        <View>
            <View style={styles.container}>

                <TouchableHighlight
                    onPress={toggleKeyboardType}
                    underlayColor={colors.secondary}
                    style={{borderRadius: 20}}
                >
                    <Ionicons
                        name={"happy-outline"}
                        size={24}
                        color={colors.textSecondaryVariant}
                    />
                </TouchableHighlight>

                <TextInput
                    style={styles.input}
                    name='msg'
                    placeholder='Escribe aquí tu mensaje'
                    onChangeText={(value) => setMsg(value)}
                    defaultValue={msg}
                    ref={inputRef}
                    autoFocus={showKeyboard}
                />

                <TouchableWithoutFeedback 
                    onPress={submitMsg}
                    underlayColor={colors.secondary}
                    style={{borderRadius: 20}}
                >
                    <Ionicons
                        name={"send-outline"}
                        size={24}
                        color={colors.textSecondaryVariant}
                    />
                </TouchableWithoutFeedback>
            </View>

            <EmojiPicker
                onEmojiSelected={pick => {
                    setMsg(msg + pick.emoji)
                    setIsOpen(false)
                    inputRef.current.blur()
                }}
                open={isOpen}
                onClose={() => {
                    setIsOpen(false)
                }}
            />
        </View>
    )
}

export default Input