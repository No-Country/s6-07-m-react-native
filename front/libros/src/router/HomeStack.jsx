import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeBooks from '../screens/tabscreens/home/HomeBooks';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Home' component={HomeBooks} />
		</Stack.Navigator>
	);
};

export default HomeNavigator;
