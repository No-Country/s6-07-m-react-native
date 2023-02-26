//React
import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text
} from "react-native"
//Styles
import { styles } from './styles'
//Redux
import { useSelector } from 'react-redux'

const Balloon = ({ userID, msg }) => {

    const user = useSelector(state => state.user)

    const transmitter = () => {
        if (userID === user.ID) {
            return true
        }

        return false
    }

    return (
        <View
            style={transmitter()
                    ?
                        { ...styles.containerTransmitter }
                    :
                        { ...styles.containerReceiver }}
        >
            <Text style={styles.text}>
                {msg}
            </Text>
        </View>
    )
}

export default Balloon