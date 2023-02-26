//React
import React, { useState, useEffect } from 'react'
import {
    View,
    Text
} from "react-native"
//Styles
import { styles } from "./styles"
import { colors } from '../../../../utils/constants'
//Icons
import { Ionicons } from '@expo/vector-icons'

const Tips = () => {

    let [ toggleDisplay, setToggleDisplay ] = useState("flex")

    useEffect(()=>{
        setToggleDisplay("flex")
    }, [])

    return (
        <View style={{...styles.container, display: toggleDisplay}}>
            <View style={styles.iconContainer}>
                <Ionicons
                    name={'mail-outline'}
                    size={24}
                    color={"green"}
                />
            </View>
            <Text style={styles.title}>
                Sugerencias de GiveAway
            </Text>
            <Text style={styles.tips}>
                {'\u2022'} Comunícate de una manera amable y concisa.{'\n'}
                {'\u2022'} Pueden encontrarse en un lugar concurrido.{'\n'}
                {'\u2022'} Nunca compartas tu domicilio.{'\n'}
            </Text>
            <View style={{...styles.close}}>
                <Ionicons
                    name={'close-outline'}
                    size={24}
                    color={colors.textSecondaryVariant}
                    onPress={()=> setToggleDisplay("none")}
                />
            </View>
        </View>
    )
}

export default Tips