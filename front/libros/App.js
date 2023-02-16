import 'react-native-gesture-handler';

import * as React from 'react';
import Router from './src/router/Router';
//Redux
import { Provider } from 'react-redux'
import store from './src/store/index'
//Fonts
import {useFonts} from "expo-font"
import { ActivityIndicator } from 'react-native';

export default function App() {

	const [fontsLoaded] = useFonts({
		"Roboto-Black" : require("./assets/fonts/Roboto-Black.ttf"),
		"Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
		"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
		"Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
		"Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
		"Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
		"Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
		"Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
		"Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
		"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
		"Roboto-ThinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
	})

	if (!fontsLoaded) {
		return <ActivityIndicator />
	}

	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
}
