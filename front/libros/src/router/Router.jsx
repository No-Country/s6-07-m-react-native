import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Test from '../screens/Test';
import TabNagivator from './TabNagivator';

const Stack = createStackNavigator();

const LogedStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={TabNagivator} />
		</Stack.Navigator>
	);
};

export default Router = () => {
	return (
		<NavigationContainer>
			<LogedStack />
		</NavigationContainer>
	);
};
