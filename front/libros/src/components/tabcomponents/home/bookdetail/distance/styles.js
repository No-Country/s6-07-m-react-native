import { StyleSheet } from 'react-native';
import { widthPixel,pixelSizeHorizontal, pixelSizeVertical, heightPixel, fontPixel} from '../../../../../utils/normalize';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f2f2f2 ',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: heightPixel(45),
		flexDirection: 'row',
		marginTop: 1,
	},
    text: {
        color: '#263238',
        fontSize: fontPixel(20), 
    },

});  
