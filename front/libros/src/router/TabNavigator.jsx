import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Test from '../screens/Test';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen name='Test' component={Test} />
		</Tab.Navigator>
	);
}
