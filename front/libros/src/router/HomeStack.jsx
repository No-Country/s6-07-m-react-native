import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeBooks from './../screens/tabscreens/home/bookhome/index'
import BookDetail from '../screens/tabscreens/home/bookdetail/index'
import { Avatar } from '../components/tabcomponents/home/index'
import Contact from '../components/tabcomponents/home/Contact/Contact'

const Stack = createNativeStackNavigator()

const HomeNavigator = ({ navigation }) => {
	return (
		<Stack.Navigator initialRouteName='HomeBooks'>
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
					headerRight: () => <Avatar />,
				})}
			/>
			<Stack.Screen
				name='Contact'
				component={Contact}
				options={({ navigation }) => ({
					title: 'Contacto',
					headerRight: () => <Avatar />,
				})}
			/>
		</Stack.Navigator>
	)
}

export default HomeNavigator
