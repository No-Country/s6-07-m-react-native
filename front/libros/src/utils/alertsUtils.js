import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'

export const alerts = {
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

export const alertToast = (type, text1, text2) => {
	Toast.show({
		type,
		text1,
		text2,
	})
}

export const showAlert = ({ title, msg, options, cancelable }) => {
	Alert.alert(title, msg, options, { cancelable })
}

export const getStatus = {
	404: ({status}) => {
		return showAlert({
			...alerts.success,
			title: 'Error: ' + status,
			msg: 'Algo salió mal. Registrate, o intenta nuevamente más tarde.',
			options: [
				{
					text: 'OK',
					onPress: () => console.log("Error: " + status),
				},
			],
		})
	},
	500: ({status}) => {
		return showAlert({
			...alerts.success,
			title: 'Error: ' + status,
			msg: 'Error de conexión. Revisa tu conexión de red, o intenta nuevamente más tarde.',
			options: [
				{
					text: 'OK',
					onPress: () => console.log("Error: " + status),
				},
			],
		})
	},
	default: ({status, alert}) => {
		return showAlert(alert)
	}
}