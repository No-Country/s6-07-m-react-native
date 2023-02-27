//React
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Alert,
	ScrollView,
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
import { post, get } from '../../../utils/apiUtils'
//Spinner
import Spinner from '../../../components/spinner/Spinner'

const Register = () => {
	const { navigate } = useNavigation()

	const { username, email, password, rePassword } = initialValues

	const registerValuesSchema = {
		username: valuesSchema.username,
		email: valuesSchema.email,
		password: valuesSchema.password,
		rePassword: valuesSchema.rePassword,
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

	const alerts = {
		success: {
			title: 'Registro',
			msg: 'Registro exitoso',
			options: [
				{
					text: 'OK',
					onPress: () => console.log('OK Pressed'),
				},
			],
			cancelable: false,
		},
		error: {
			title: 'Error',
			msg: 'Ocurrió un error. Intenta nuevamente mas tarde.',
			options: [
				{
					text: 'OK',
					onPress: () => console.log('OK Pressed'),
				},
			],
			cancelable: false,
		},
	}

	showAlert = ({ title, msg, options, cancelable }) => {
		Alert.alert(title, msg, options, { cancelable })
	}

	const onSubmit = async (values) => {
		try {
			setSpinner("flex")
			
			let { status } = await post("/user/signup", { ...values })
			console.log(status)
			
			if (status === 200) {
				setSpinner("none")
				showAlert({
					...alerts.success,
					options: [
						{
							text: 'OK',
							onPress: async () => navigate("Inicio de sesión"),
						},
					],
				})
			} else {
				setSpinner("none")
				showAlert(alerts.error)
			}
			
		} catch (error) {
			setSpinner("none")
			console.log("ERROR ", error)
			showAlert({ ...alerts.error, title: error })
		}
	}

	return (
		<ScrollView
			contentContainerStyle={{
				...styles.container,
				height: "100%",
				marginTop: 0,
				justifyContent: "center",
			}}
		>
			<Formik
				initialValues={{
					username,
					email,
					password,
					rePassword,
				}}
				validationSchema={formSchema(registerValuesSchema)}
				onSubmit={values => {
					onSubmit(values)
				}}
			>
				{({ handleChange, handleSubmit, errors }) => (
					<>
						<Text style={styles.title}>Nombre de usuario</Text>
						<TextInput
							style={styles.input}
							placeholder='Nombre de usuario'
							name='username'
							onChangeText={handleChange('username')}
						/>
						{errors?.username && (
							<Text style={styles.error}>{errors?.username}</Text>
						)}

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

						<Text style={styles.title}>Repetir contraseña</Text>
						<TextInput
							style={styles.input}
							name='rePassword'
							placeholder='Repetir contraseña'
							onChangeText={handleChange('rePassword')}
							secureTextEntry={!showPass}
						/>
						{errors?.rePassword && (
							<Text style={styles.error}>{errors?.rePassword}</Text>
						)}

						<TouchableOpacity style={styles.btn} onPress={handleSubmit}>
							<Text style={styles.btnTxt}>Registrarse</Text>
						</TouchableOpacity>
					</>
				)}
			</Formik>

			<View style={styles.toLoginContainer}>
				<Text style={styles.toLoginTitle}>¿Ya tienes una cuenta?</Text>
				<TouchableWithoutFeedback
					style={styles.touchable}
					onPress={() => navigate('Inicio de sesión')}
				>
					<Text style={styles.touchableTxt}>Inicia sesión</Text>
				</TouchableWithoutFeedback>
			</View>
			<Spinner display={spinner} />

		</ScrollView>
	)
}

export default Register
