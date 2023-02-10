import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';

const FormNewArticle = () => {
	return (
		<View>
			<Text>Anywhere in your app!</Text>
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
						<Button onPress={handleSubmit} title='LOGIN' disabled={!isValid} />
					</>
				)}
			</Formik>
		</View>
	);
};

export default FormNewArticle;
