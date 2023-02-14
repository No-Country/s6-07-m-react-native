//React
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
//Components
import Login from '../auth/login/component/Login';
import Register from '../auth/register/component/Register';
import SwitchLoginRegister from '../auth/switchLoginSignUp/components/SwitchLoginRegister';

const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#8F77DB',
			}}
		>
			<Stack.Screen
				name='Autenticación'
				component={SwitchLoginRegister}
			/>
			<Stack.Screen
				name="Inicio de sesión"
				component={Login}
				options={{
					headerShown: true,
				}}
			/>
			<Stack.Screen
				name="Registro"
				component={Register}
				options={{
					headerShown: true,
				}}
			/>
		</Stack.Navigator>
  )
}

export default AuthStack