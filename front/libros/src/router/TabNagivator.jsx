import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Test from '../screens/Test';

const Tab = createBottomTabNavigator();

const TabNagivator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name='HomeUser' component={Home} />
			<Tab.Screen name='Test' component={Test} />
		</Tab.Navigator>
	);
};

export default TabNagivator;
