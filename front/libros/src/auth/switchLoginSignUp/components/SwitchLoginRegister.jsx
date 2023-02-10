//React
import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

//Styles
import { styles } from "../styles/styles.js";

const SwitchLoginRegister = () => {

  let [pressedLogin, SetPressedLogin] = useState(true)
  let [pressedRegister, SetPressedRegister] = useState(false)

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <Image
          source={require("../img/Logo.jpg")}
          style={{
            width: 180
          }}
        />
        <Text
          style={styles.logoTitle}
        >
          GiveAway
        </Text>
      </View>

      <View style={styles.switchContainer}>

        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: pressedLogin ? "#FFFFFF" : "#6559E5"
          }}
          onPress={() => {
            SetPressedLogin(true);
            SetPressedRegister(false);
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: pressedLogin ? "black" : "#FFFFFF"
            }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: pressedRegister ? "#FFFFFF" : "#6559E5"
          }}
          onPress={() => {
            SetPressedLogin(false);
            SetPressedRegister(true);
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: pressedRegister ? "black" : "#FFFFFF"
            }}>
            Registrarse
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SwitchLoginRegister