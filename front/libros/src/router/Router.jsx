import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNagivator from './TabNagivator';
import Login from '../auth/Login';

const Stack = createStackNavigator();

const LoggedStack = () => {
	return (
		<Stack.Navigator
		screenOptions={{
			headerShown: false,
		}}


	
		>
			<Stack.Screen name='Home' component={TabNagivator} />
		</Stack.Navigator>
	);
};

const NoLoggedStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{
					title: 'Login',
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	);
};

export default Router = () => {
	const isLogged = true;
	return (
		<NavigationContainer>
			{isLogged ? <LoggedStack /> : <NoLoggedStack />}
		</NavigationContainer>
	);
};
