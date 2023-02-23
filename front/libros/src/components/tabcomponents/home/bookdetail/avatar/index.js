import React from 'react';
import { View,Image, TouchableOpacity } from 'react-native';
import styles from './styles';


const Avatar = ({ image, navigation }) => {

	return (
		<TouchableOpacity>
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={require('./../../../../../../assets/avatar.jpeg')}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default Avatar;
