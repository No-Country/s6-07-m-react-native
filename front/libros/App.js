import 'react-native-gesture-handler';

import * as React from 'react';
import Router from './src/router/Router';
//Redux
import { Provider } from 'react-redux'
import store from './src/store/index'

export default function App() {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
}
