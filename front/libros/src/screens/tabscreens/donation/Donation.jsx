import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import FormNewArticle from './FormNewArticle';

const Donation = () => {
	return (
		<SafeAreaView
			style={{
				marginTop: 56,
			}}
		>
			<FormNewArticle />
		</SafeAreaView>
	);
};

export default Donation;
