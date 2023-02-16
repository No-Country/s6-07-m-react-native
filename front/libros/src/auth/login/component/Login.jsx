//React
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
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

const Login = () => {
	const { navigate } = useNavigation()

	const { email, password } = initialValues

	const registerValuesSchema = {
		email: valuesSchema.email,
		password: valuesSchema.password,
	}

	let [showPass, setShowPass] = useState(false)
	let [toggleEye, setToggleEye] = useState('eye-off-outline')

	const ShowHidePass = () => {
		if (!showPass) {
			setShowPass(true)
			setToggleEye('eye-outline')
		} else {
			setShowPass(false)
			setToggleEye('eye-off-outline')
		}
	}

	return (
		<View style={styles.container}>
			<Formik
				initialValues={{
					email,
					password,
				}}
				validationSchema={formSchema(registerValuesSchema)}
				onSubmit={values => {
					console.log(values)
				}}
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
							<Text style={styles.btnTxt}>Registrarse</Text>
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
		</View>
	)
}

export default Login
