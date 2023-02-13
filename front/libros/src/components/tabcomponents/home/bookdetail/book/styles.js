import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
	},
	containerBook: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		width: '100%',
		height: 243,
	},
	bookcontainer: {
		backgroundColor: '#fff',
		flexDirection: 'row',
        position: 'absolute',
        top: 5,
	},
	text: {
		color: '#fff',
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#000',
		borderWidth: 1,
	},
    image: {
        width: 80,
        height: 125,
        borderWidth: 1,
    
    }
});
