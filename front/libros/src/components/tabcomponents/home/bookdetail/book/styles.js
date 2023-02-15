import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	
	},
	containerBook: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	
		width: '100%',
		height: 243,
        flexDirection: 'column',
	},
	bookcontainer: {
		backgroundColor: '#fff',
		flexDirection: 'row',
      
	},
	text: {
		color: '#263238',
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#263238',
        width: 200,
        marginLeft: 10,
        marginTop: 15,
	},
    textDescription: {
        fontSize: 14,
        fontWeight: 'regular',
        color: '#666363',
        width: 330, 
        marginTop: 10,
        margin: 5,
		height: 86,
    },
    image: {
        width: 80,
        height: 125,
        borderWidth: 1,
    
    }
});
