import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabNagivator from './TabNagivator'
import AuthStack from './AuthStack'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

const LoggedStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Home' component={TabNagivator} />
		</Stack.Navigator>
	)
}

const NoLoggedStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#8F77DB',
			}}
		>
			<Stack.Screen name='Auth' component={AuthStack} />
		</Stack.Navigator>
	)
}

export default Router = () => {
	const user = useSelector(state => state.user)
	return (
		<NavigationContainer>
			{!user ? <LoggedStack /> : <NoLoggedStack />}
		</NavigationContainer>
	)
}
