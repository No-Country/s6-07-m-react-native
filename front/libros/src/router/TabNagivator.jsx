import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Chat from '../screens/Chat';
import Donation from '../screens/Donation';
import HomeBooks from '../screens/HomeBooks';
import Profile from '../screens/Profile';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNagivator = () => {
	return (
		<Tab.Navigator
			initialRouteName='HomeTab'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen 
			options={{
				
				tabBarIcon: ({ focused }) => (
				  <Ionicons
					name={focused ? "book" : "book-outline"}
					size={24}
					color={focused ? "#8F77DB" : "#000"}
				  />
				),
			  }}
			name='HomeBooks' component={HomeBooks} />
			<Tab.Screen name='Profile' component={Profile} />
			<Tab.Screen name='Donation' component={Donation} />
			<Tab.Screen name='Chat' component={Chat} />
		</Tab.Navigator>
	);
};

export default TabNagivator;
