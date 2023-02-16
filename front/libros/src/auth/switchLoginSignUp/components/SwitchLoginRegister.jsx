//React
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native';

//Styles
import { styles } from "../styles/styles.js";
import { colors } from '../../../utils/constants.js';
//Logo
import Logo from './Logo.jsx';

const SwitchLoginRegister = () => {

  let [pressedLogin, SetPressedLogin] = useState(true)
  let [pressedRegister, SetPressedRegister] = useState(false)

  const navigation = useNavigation()

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
        <Logo />
        <Text style={styles.logoTitle}>
          GiveAway
        </Text>
      </View>

      <View style={styles.switchContainer}>

        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: pressedLogin ? colors.background : colors.primary
          }}
          onPress={() => {
            SetPressedLogin(true);
            SetPressedRegister(false);
            navigation.navigate("Inicio de sesión")
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: pressedLogin ? colors.text : colors.background
            }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor: pressedRegister ? colors.background : colors.primary
          }}
          onPress={() => {
            SetPressedLogin(false);
            SetPressedRegister(true);
            navigation.navigate("Registro")
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: pressedRegister ? colors.text : colors.background
            }}>
            Registrarse
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SwitchLoginRegister