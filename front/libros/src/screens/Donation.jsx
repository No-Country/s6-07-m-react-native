import React from 'react';
import { Text, View , StyleSheet} from 'react-native';

const Donation = () => {
	return (
		<View style={styles.container}>
			<Text>Donation</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});


export default Donation;
