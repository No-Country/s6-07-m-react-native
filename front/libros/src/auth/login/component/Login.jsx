//React
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native'
//Styles
import { colors, formStyles as styles } from '../../../utils/constants'
//Icons
import { Ionicons } from '@expo/vector-icons'
//Formik
import { Formik } from 'formik'
//Validation
import {
	initialValues,
	valuesSchema,
	formSchema,
} from '../../../utils/formValidation'
//Axios
import { post } from '../../../utils/apiUtils'
//Redux
import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/slices/user.slice'
//Storage
import AsyncStorage from '@react-native-async-storage/async-storage'
//Alerts
import { showAlert, alerts } from '../../../utils/alertsUtils'

import Spinner from '../../../components/spinner/Spinner'


const Login = () => {

	const { navigate } = useNavigation()

	const { email, password } = initialValues

	const registerValuesSchema = {
		email: valuesSchema.email,
		password: valuesSchema.password,
	}

	let [showPass, setShowPass] = useState(false)
	let [toggleEye, setToggleEye] = useState('eye-off-outline')
	let [spinner, setSpinner] = useState("none")

	const ShowHidePass = () => {
		if (!showPass) {
			setShowPass(true)
			setToggleEye('eye-outline')
		} else {
			setShowPass(false)
			setToggleEye('eye-off-outline')
		}
	}

	let dispatch = useDispatch()

	const onSubmit = async values => {
		try {
			setSpinner("flex")
			const {
				status,
				data: { token, user },
			} = await post('/user/login', { ...values })
			
			if (status === 200) {
				setSpinner("none")

				showAlert({
					...alerts.success,
					title: 'Éxito!',
					msg: 'Inicio de sesión exitoso.',
					options: [
						{
							text: 'OK',
							onPress: async () => {
								await AsyncStorage.setItem("token", token)
								dispatch(setUser({ ...user }))
							},
						},
					],
				})
			} else {
				setSpinner("none")
				showAlert(alerts.error)
			}
			
		} catch (error) {
			setSpinner("none")
			console.log("SE ME VINO AL CATCH ", error)
			showAlert(alerts.error)
		}
	}

	return (
		<View 
			style={{
				...styles.container, 
				height: "100%", 
				marginTop: 0, 
				justifyContent: "center"
			}}>
			<Formik
				initialValues={{
					email,
					password,
				}}
				validationSchema={formSchema(registerValuesSchema)}
				onSubmit={values => onSubmit(values)}
			>
				{({ handleChange, handleSubmit, errors }) => (
					<>
						<Text style={styles.title}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder='Email'
							name='email'
							onChangeText={handleChange('email')}
						/>
						{errors?.email && <Text style={styles.error}>{errors?.email}</Text>}

						<Text style={styles.title}>Contraseña</Text>
						<View style={styles.pass}>
							<TextInput
								style={styles.input}
								name='password'
								placeholder='Contraseña'
								onChangeText={handleChange('password')}
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
						{errors?.password && (
							<Text style={styles.error}>{errors?.password}</Text>
						)}

						<TouchableOpacity style={styles.btn} onPress={handleSubmit}>
							<Text style={styles.btnTxt}>Iniciar sesión</Text>
						</TouchableOpacity>
					</>
				)}
			</Formik>

			<View style={styles.toLoginContainer}>
				<Text style={styles.toLoginTitle}>¿No tienes una cuenta?</Text>
				<TouchableWithoutFeedback
					style={styles.touchable}
					onPress={() => navigate('Registro')}
				>
					<Text style={styles.touchableTxt}>Registrate</Text>
				</TouchableWithoutFeedback>
			</View>
			<Spinner display={spinner}/>
		</View>
	)
}

export default Login