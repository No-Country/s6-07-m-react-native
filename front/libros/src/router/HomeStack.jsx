import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeBooks from './../screens/tabscreens/home/HomeBooks';
import BookDetail from '../screens/tabscreens/home/bookdetail/index';
import { TouchableOpacity, View, Image } from 'react-native';
import {Avatar} from '../components/tabcomponents/home/index';

const Stack = createNativeStackNavigator();

const HomeNavigator = ({ navigation }) => {
	return (
		<Stack.Navigator initialRouteName='BookDetail'>
			<Stack.Screen
				name='HomeBooks'
				options={{ headerShown: false }}
				component={HomeBooks}
			/>
			<Stack.Screen
				name='BookDetail'
				component={BookDetail}
				options={({ navigation }) => ({
					title: 'Solicita del libro',
					headerRight: () => (
						<Avatar/>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

export default HomeNavigator;
