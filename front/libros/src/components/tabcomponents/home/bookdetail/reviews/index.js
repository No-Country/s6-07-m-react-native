import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Reviews = () => {
	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}></View>
            <View style={styles.reviewsContainer}></View>
		</View>
	);
};

export default Reviews;
