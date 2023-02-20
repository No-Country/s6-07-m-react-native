import React, {useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { Formik } from 'formik';

import userDetail from '../../mocks/userObj.json';
import UserCard from '../components/userCard';

const EditUserDetails = () => {
    const [initialValues, setInitialValues] = useState({email: 'user@email', location: 'Mexico, Cuernavaca'});
    // using fetch to get user information
    useEffect(() => {
        fetch()
        .then(res => res.json())
        .then(data => setInitialValues({email: data.email, location: data.location}))
        .catch(err => console.log(err))
    })

    return (
        <View>
            {/* El background por default es blanco pero pueden cambiar el color 
            expecificandolo en el estilo y para quitar el background ponerle transparent. */}
            <UserCard starRight={'none'} data={userDetail} style={{backgroundColor:'transparent'}}/>
            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                <View>
                <Text style={styles.text}>Correo</Text>
                    <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder={initialValues.email}
                    style={styles.textInput}
                    />
                    
                </View>
                <View>
                <Text style={styles.text}>Localizacion</Text>
                    <TextInput
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                    placeholder={initialValues.location}
                    style={styles.textInput}
                    />
                   
                </View>
                <Button onPress={handleSubmit} title="Editar" style={styles.btn} />
                </View>    
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 40
    }, 
    textInput: {
        height: 40, 
    	borderBottomColor: 'gray', 
    	borderBottomWidth: 1,
    	placeholderTextColor: 'gray',
        marginBottom: 30,
        padding: 5
    },
    text: {
        marginLeft: 5
    },
    btn: {
        backgroundColor: '#FF3D45',
        borderRadius: 20,
        padding: 15
    }
});

export default EditUserDetails;