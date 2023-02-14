//React
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
//Styles
import { colors, formStyles as styles } from '../../../utils/constants';
//Icons
import { Ionicons } from '@expo/vector-icons';
//Formik
import { Formik } from "formik";
//Validation
import {
  initialValues,
  valuesSchema,
  formSchema
} from '../../../utils/formValidation';

import axios from "axios";
//import Config from "react-native-config";

import { post, get } from '../../../utils/apiUtils';

const Register = () => {

  const { navigate } = useNavigation();

  const {
    username,
    email,
    password,
    rePassword,
  } = initialValues;

  const registerValuesSchema = {
    username: valuesSchema.username,
    email: valuesSchema.email,
    password: valuesSchema.password,
    rePassword: valuesSchema.rePassword
  }

  let [showPass, setShowPass] = useState(false);
  let [toggleEye, setToggleEye] = useState("eye-off-outline")

  const ShowHidePass = () => {
    if (!showPass) {
      setShowPass(true)
	  setToggleEye("eye-outline")
    } else {
		setShowPass(false)
		setToggleEye("eye-off-outline")
    }
  }

  const onSubmit = async (values) => {
    try {
      console.log(valuesSchema);

      let response = await post("http://127.0.0.1:3007/user/signUp", {...values})
      //let response = await get("https://pokeapi.co/api/v2/pokemon")
      console.log(response)
    } catch (error) {
      console.log("ERROR ", error)
    }
  }

  return (
    <View style={styles.container}>

      <Formik
        initialValues={{
          username,
          email,
          password,
          rePassword
        }}
        validationSchema={formSchema(registerValuesSchema)}
        onSubmit={(values) => {
          onSubmit(values)
        }}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <Text style={styles.title}>Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de usuario"
              name="username"
              onChangeText={handleChange("username")}
            />
            {errors?.username && <Text style={styles.error}>{errors?.username}</Text>}

            <Text style={styles.title}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              name="email"
              onChangeText={handleChange("email")}
            />
            {errors?.email && <Text style={styles.error}>{errors?.email}</Text>}

            <Text style={styles.title}>Contraseña</Text>
            <View style={styles.pass}>
              <TextInput
                style={styles.input}
                name="password"
                placeholder="Contraseña"
                onChangeText={handleChange("password")}
                secureTextEntry={!showPass}
              />
              <Ionicons
                style={styles.eye}
                name={toggleEye}
                size={24}
                color={colors.text}
                onPress={ShowHidePass}
              />
            </View>
            {errors?.password && <Text style={styles.error}>{errors?.password}</Text>}

            <Text style={styles.title}>Repetir contraseña</Text>
            <TextInput
              style={styles.input}
              name="rePassword"
              placeholder="Repetir contraseña"
              onChangeText={handleChange("rePassword")}
              secureTextEntry={!showPass}
            />
            {errors?.rePassword && <Text style={styles.error}>{errors?.rePassword}</Text>}

            <TouchableOpacity
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTxt}>Registrarse</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={styles.toLoginContainer}>
        <Text style={styles.toLoginTitle}>
          ¿Ya tienes una cuenta?
        </Text>
        <TouchableWithoutFeedback
          style={styles.touchable}
          onPress={() => navigate("Inicio de sesión")}
        >
          <Text style={styles.touchableTxt}>
            Inicia sesión
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default Register