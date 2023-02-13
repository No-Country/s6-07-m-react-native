import React from 'react';
import { Text, View } from 'react-native';
import FormNewArticle from './FormNewArticle';

const Donation = () => {
	return (
		<View style={{ marginHorizontal: 16 }}>
			<Text>Donation navigation</Text>
			<FormNewArticle />
		</View>
	);
};

export default Donation;
