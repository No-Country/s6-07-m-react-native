import { StyleSheet } from 'react-native';
import { fontPixel, heightPixel, widthPixel } from '../../../../../utils/normalize';

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
		height: heightPixel(243),
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
		fontSize: fontPixel(20),
		fontWeight: 'bold',
		color: '#263238',
        width: widthPixel(155),
        marginLeft: 10,
        marginTop: 15,
	},
    textDescription: {
        fontSize: fontPixel(14),
        fontWeight: 'regular',
        color: '#666363',
        width: widthPixel(279), 
        marginTop: 10,
        margin: 5,
		height: heightPixel(86),
    },
    image: {
        width: widthPixel(80),
        height: heightPixel(125),
        borderWidth: 1, 
    }
});
