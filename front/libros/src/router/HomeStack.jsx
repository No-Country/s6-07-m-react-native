import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeBooks from '../screens/tabscreens/home/HomeBooks';
import BookDetail from '../screens/tabscreens/home/HomeDetail';

const Stack = createNativeStackNavigator();

const HomeNavigator = ({ navigation }) => {
	return (
		<Stack.Navigator
			initialRouteName='HomeDetail'
		>
			<Stack.Screen
				name='Home'
				options={{ headerShown: false }}
				component={HomeBooks}
			/>
			<Stack.Screen name='HomeDetail' component={BookDetail} />
		</Stack.Navigator>
	);
};

export default HomeNavigator;
