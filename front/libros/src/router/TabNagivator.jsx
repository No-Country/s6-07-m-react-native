import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Chat from '../screens/Chat';
import Donation from '../screens/Donation';
import HomeBooks from '../screens/HomeBooks';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const TabNagivator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name='HomeBooks' component={HomeBooks} />
			<Tab.Screen name='Profile' component={Profile} />
			<Tab.Screen name='Donation' component={Donation} />
			<Tab.Screen name='Chat' component={Chat} />
		</Tab.Navigator>
	);
};

export default TabNagivator;
