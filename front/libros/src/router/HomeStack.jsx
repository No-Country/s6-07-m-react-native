import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeBooks from "../screens/tabscreens/home/HomeBooks";
import HomeDetail from '../screens/tabscreens/home/HomeDetail';

const Stack = createNativeStackNavigator();

const HomeNavigator = ({ navigation }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeBooks} />
			<Stack.Screen name='HomeDetail' component={HomeDetail} />
		</Stack.Navigator>
	);
};

export default HomeNavigator;
