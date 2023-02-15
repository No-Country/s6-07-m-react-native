import React, { useState } from 'react';
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Formik } from 'formik';
import SvgComponent from './svg/SvgComponent';
import {
	colors,
	formStyles as stylesConstants,
} from '../../../utils/constants';
import ModalPublicated from './ModalPublicated';

const FormNewArticle = () => {
	const [modalVisible, setModalVisible] = useState(false);
	console.log(modalVisible);

	const uploadImage = () => {
		console.log('subir img');
	};

	return (
		<View>
			{modalVisible ? (
				<ModalPublicated
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			) : (
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
							initialValues={{ email: '', password: '' }}
							onSubmit={values => console.log(values)}
						>
							{({
								handleChange,
								handleBlur,
								handleSubmit,
								values,
								errors,
								isValid,
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
									/>
									{errors?.username && (
										<Text style={stylesConstants.error}>{errors?.title}</Text>
									)}
									<Text style={stylesConstants.title}>Resumen</Text>
									<TextInput
										style={stylesConstants.input}
										placeholder='Resumen'
										name='description'
										onChangeText={handleChange('description')}
									/>
									{errors?.username && (
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
									/>
									{errors?.username && (
										<Text style={stylesConstants.error}>
											{errors?.editorial}
										</Text>
									)}
									<Text style={stylesConstants.title}>Estado del libro</Text>
									{/*Poner un select con distintasa opciones*/}
									<TextInput
										style={stylesConstants.input}
										placeholder='Estado'
										name='conditions'
										onChangeText={handleChange('conditions')}
									/>
									{errors?.username && (
										<Text style={stylesConstants.error}>
											{errors?.username}
										</Text>
									)}
									<Text>MAPA</Text>
									<View style={{ alignItems: 'center' }}>
										<TouchableOpacity
											style={styles.buttonSubmit}
											onPress={handleSubmit}
											disabled={!isValid}
										>
											<Text style={styles.textButton}>Publicar</Text>
										</TouchableOpacity>
									</View>
								</>
							)}
						</Formik>
						<TouchableOpacity onPress={() => setModalVisible(true)}>
							<Text>Show Modal</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
};

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
		backgroundColor: '#FF3D45',
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
});

export default FormNewArticle;
