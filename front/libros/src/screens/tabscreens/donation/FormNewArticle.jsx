import React, { useState } from 'react'
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Formik } from 'formik'
import SvgComponent from './svg/SvgComponent'
import { colors, formStyles as stylesConstants } from '../../../utils/constants'
import ModalPublicated from './ModalPublicated'
import { formSchema, valuesSchema } from '../../../utils/formValidation'
import * as ImagePicker from 'expo-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { alertToast } from '../../../utils/alertsUtils'
import axios from 'axios'

const FormNewArticle = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [image, setImage] = useState('')
	const [newDonation, setNewDonation] = useState({})
	console.log(newDonation)

	const initialValues = {
		title: '',
		description: '',
		editorial: '',
		author: '',
	}

	const donationValueSchema = {
		title: valuesSchema.title,
		description: valuesSchema.description,
		editorial: valuesSchema.editorial,
		author: valuesSchema.author,
	}

	const uploadImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		console.log(result)

		if (!result.canceled) {
			console.log(result.assets[0].uri)
			setImage(result.assets[0].uri)
		}
	}

	const handleSubmit = async (values, resetForm) => {
		const objDonation = {
			...values,
			image,
			id: '63ea5f5c5323eae501ef1650',
		}

		try {
			await axios
				.post('http://192.168.0.77:3000/book/donateBook', objDonation)
				.then(response => {
					setNewDonation(response.data)
				})
		} catch (error) {
			console.log('Esto esta mal :' + error)
		}

		resetForm()
		setModalVisible(true)
	}

	return (
		<View>
			{modalVisible ? (
				<ModalPublicated
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			) : (
				<KeyboardAwareScrollView>
					<View>
						<View style={styles.header}>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>
								Dona tu libro
							</Text>
							<Image
								source={{ uri: 'https://picsum.photos/200/300' }}
								style={{ width: 36, height: 36, borderRadius: 20 }}
							/>
						</View>
						<View style={styles.containerForm}>
							<Formik
								validationSchema={formSchema(donationValueSchema)}
								initialValues={initialValues}
								onSubmit={(values, { resetForm }) => {
									handleSubmit(values, resetForm)
								}}
							>
								{({
									handleChange,
									handleSubmit,
									handleBlur,
									values,
									errors,
									isValid,
									resetForm,
								}) => (
									<>
										<TouchableOpacity
											onPress={uploadImage}
											style={{ alignItems: 'center' }}
										>
											<View style={styles.uploadImg}>
												<View style={{ alignItems: 'center', paddingTop: 8 }}>
													<SvgComponent />
													<Text style={{ marginTop: 6 }}>Cargar Imagen</Text>
												</View>
											</View>
										</TouchableOpacity>
										<Text style={stylesConstants.title}>Titulo</Text>
										<TextInput
											style={stylesConstants.input}
											placeholder='Titulo del libro'
											name='title'
											onChangeText={handleChange('title')}
											value={values.title}
											onBlur={handleBlur('title')}
										/>
										{errors?.title && (
											<Text style={stylesConstants.error}>{errors?.title}</Text>
										)}
										<Text style={stylesConstants.title}>Descripcion</Text>
										<TextInput
											style={stylesConstants.input}
											placeholder='Descripcion'
											name='description'
											onChangeText={handleChange('description')}
											value={values.description}
											onBlur={handleBlur('description')}
										/>
										{errors?.description && (
											<Text style={stylesConstants.error}>
												{errors?.description}
											</Text>
										)}
										<Text style={stylesConstants.title}>Editorial</Text>
										<TextInput
											style={stylesConstants.input}
											placeholder='Editorial'
											name='editorial'
											onChangeText={handleChange('editorial')}
											value={values.editorial}
											onBlur={handleBlur('editorial')}
										/>
										{errors?.editorial && (
											<Text style={stylesConstants.error}>
												{errors?.editorial}
											</Text>
										)}
										<Text style={stylesConstants.title}>Autor del libro</Text>
										{/*Poner un select con distintasa opciones*/}
										<TextInput
											style={stylesConstants.input}
											placeholder='Autor'
											name='author'
											onBlur={handleBlur('author')}
											onChangeText={handleChange('author')}
											value={values.author}
										/>
										{errors?.author && (
											<Text style={stylesConstants.error}>
												{errors?.author}
											</Text>
										)}
										<Text>MAPA</Text>
										<View style={{ alignItems: 'center' }}>
											<TouchableOpacity
												style={styles.buttonSubmit}
												onPress={handleSubmit}
											>
												<Text style={styles.textButton}>Publicar</Text>
											</TouchableOpacity>
										</View>
									</>
								)}
							</Formik>
						</View>
					</View>
				</KeyboardAwareScrollView>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		marginHorizontal: 16,
		marginBottom: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	containerForm: {
		marginHorizontal: 26,
	},
	uploadImg: {
		// position: 'relative',
		// left: '20%',
		width: 171,
		height: 81,
		borderRadius: 8,
		borderStyle: 'dashed',
		borderWidth: 1,
		borderColor: 'gray',
		color: '#C5C5C5',
		borderDash: [4, 2],
	},
	buttonSubmit: {
		backgroundColor: colors.primary,
		color: 'white',
		width: 254,
		height: 48,
		borderRadius: 30,
		justifyContent: 'center',
	},
	textButton: {
		color: 'white',
		fontSize: 17,
		fontWeight: '700',
		textAlign: 'center',
	},
})

export default FormNewArticle
