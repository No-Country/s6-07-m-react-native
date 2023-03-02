import React, { useState } from 'react'
import {
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectDropdown from 'react-native-select-dropdown'

import { Ionicons } from '@expo/vector-icons'
import HeaderComponent from '../../../components/headerComponent'
import useNewArticle from '../../../hooks/useNewArticle'
import { sample_data } from '../../../../mocks/provinces'

const FormNewArticle = () => {
	const {
		modalVisible,
		image,
		uploadImage,
		setImage,
		handleSubmit,
		setModalVisible,
		setProvince,
	} = useNewArticle()

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
						<HeaderComponent left={true} title={'Dona tu Libro'} />
						{/* Reemplace el componente de abajo por el de arriba para poder poner el drawer*/}
						{/* <View style={styles.header}>
							<Text style={{ fontSize: 18, fontWeight: '500' }}>
								Dona tu libro
							</Text>
							<Image
								source={{ uri: 'https://picsum.photos/200/300' }}
								style={{ width: 36, height: 36, borderRadius: 20 }}
							/>
						</View> */}

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
								}) => (
									<>
										<TouchableOpacity
											onPress={uploadImage}
											style={{ alignItems: 'center' }}
										>
											<View style={styles.uploadImg}>
												<View style={{ alignItems: 'center', paddingTop: 8 }}>
													{image ? (
														<View>
															<TouchableOpacity
																onPress={() => setImage('')}
																style={{
																	position: 'absolute',
																	bottom: 90,
																	left: 140,
																}}
															>
																<Ionicons name='close-circle' size={30} />
															</TouchableOpacity>
															<Image
																source={{ uri: image?.uri }}
																style={{
																	position: 'relative',
																	width: 170,
																	height: 82,
																	bottom: 10,
																	borderRadius: 8,
																}}
															/>
														</View>
													) : (
														<View>
															<View style={{ left: 28 }}>
																<SvgComponent />
															</View>
															<Text style={{ marginTop: 6 }}>
																Cargar Imagen
															</Text>
														</View>
													)}
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
										<View style={styles.selectItem}>
											<Text
												style={[
													stylesConstants.title,
													{ marginTop: 20, marginBottom: 10 },
												]}
											>
												Lugar en el que lo publicas
											</Text>
											<SelectDropdown
												data={sample_data}
												onSelect={(selectedItem, index) => {
													setProvince(selectedItem.provincia, index)
												}}
												buttonTextAfterSelection={(selectedItem, index) => {
													return selectedItem.provincia
												}}
												rowTextForSelection={(item, index) => {
													return item.provincia
												}}
												defaultButtonText='Selecciona tu provincia'
												search={true}
												searchPlaceHolder='Busca tu provincia'
												dropdownStyle={styles.dropdown}
												dropdownTextStyle={styles.dropdownText}
												buttonStyle={styles.button}
												buttonTextStyle={styles.buttonText}
												rowStyle={styles.row}
												rowTextStyle={styles.rowText}
											/>
										</View>
										<View style={{ alignItems: 'center', marginTop: 30 }}>
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
		width: 274,
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
	selectItem: {
		marginBottom: 10,
		width: '100%',
	},
	dropdown: {
		width: '88%',
		height: 200,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#fff',
	},
	dropdownText: {
		fontSize: 18,
		color: '#333',
		textAlign: 'center',
	},
	button: {
		width: '100%',
		height: 50,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#fff',
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 18,
		color: '#333',
		textAlign: 'center',
	},
	row: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		height: 50,
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	rowText: {
		fontSize: 18,
		color: '#333',
		textAlign: 'center',
	},
})

export default FormNewArticle
