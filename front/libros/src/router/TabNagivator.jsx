import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HomeNavigator from './HomeStack';
import Donation from '../screens/tabscreens/donation/Donation';
import Chat from '../components/tabcomponents/chat/components/Chat';

const Tab = createBottomTabNavigator();

const TabNagivator = ({ navigation }) => {
	return (
		<Tab.Navigator
			initialRouteName='Chat'
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#8F77DB',
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? 'book' : 'book-outline'}
							size={24}
							color={focused ? '#8F77DB' : '#b2b2b2'}
						/>
					),
				}}
				name='HomeNavigator'
				component={HomeNavigator}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? 'log-out' : 'log-out-outline'}
							size={24}
							color={focused ? '#8F77DB' : '#b2b2b2'}
						/>
					),
				}}
				name='Donation'
				component={Donation}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? 'chatbubble' : 'chatbubble-outline'}
							size={24}
							color={focused ? '#8F77DB' : '#b2b2b2'}
						/>
					),
					headerShown: false,
				}}
				name='Chat'
				component={Chat}
			/>
		</Tab.Navigator>
	);
};

export default TabNagivator;
