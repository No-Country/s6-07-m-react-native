import React from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import SvgComponent from './svg/SvgComponent';

const FormNewArticle = () => {
	return (
		<View>
			<View style={{ marginTop: 20, flexDirection: 'row' }}>
				<Text>Dona tu libro</Text>
				<Image
					source={{ uri: 'https://picsum.photos/200/300' }}
					style={{ width: 30, height: 30 }}
				/>
			</View>
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
						<View>
							<SvgComponent />
							<Text>Cargar Imagen</Text>
						</View>
						<TextInput
							name='email'
							placeholder='Email Address'
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
							keyboardType='email-address'
						/>
						{errors.email && (
							<Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
						)}
						<TextInput
							name='password'
							placeholder='Password'
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							secureTextEntry
						/>
						{errors.password && (
							<Text style={{ fontSize: 10, color: 'red' }}>
								{errors.password}
							</Text>
						)}
						<Button
							onPress={handleSubmit}
							title='Publicar'
							disabled={!isValid}
						/>
					</>
				)}
			</Formik>
		</View>
	);
};

export default FormNewArticle;
