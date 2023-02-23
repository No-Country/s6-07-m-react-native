import { StyleSheet } from 'react-native';
import { widthPixel,pixelSizeHorizontal, pixelSizeVertical, heightPixel, fontPixel} from '../../../../../utils/normalize';

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
        justifyContent: 'space-between',
		width: '100%',
		height: heightPixel(52),
		flexDirection: 'row',
        marginTop: 1
	
	},
	avatar: {
		width: widthPixel(32),
		height: heightPixel(32), 
		borderRadius: 25,
        marginRight: pixelSizeHorizontal(8),
        borderWidth: 1,
        borderColor: '#0099ff'
	
	},
	avatarContainer: {
        flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
        marginLeft: 16,
	},
	textAvatar: {
		fontSize: 12,
        fontWeight: 'bold',
	},
	reviewsContainer: {
        flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-around',
		height: 32,
        marginRight: 16,
        width: 100, 
	},
	reviews: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		height: 25,
	},
	star: {
        color: '#ffb168',
    },
    textStar: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666363',
        marginLeft: 5,
    }
});
