import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	contentReview: {
        flex: 1,
		backgroundColor: '#fff',
		width: '95%',
		marginTop: 10,
		alignItems: 'center',
	},
    containerReview: {
        flex: 1,
		marginTop: 10,
		flexDirection: 'column',
	},
	titleReview: {
		fontSize: 16,
		alignSelf: 'flex-start',
		fontWeight: 'bold',
		color: '#6427FF',
	},

	cardReview: {
		backgroundColor: '#fff',
		width: '100%',
		height: 130,
	},
	headerReview: {
		flexDirection: 'row',

		width: 'auto',
		justifyContent: 'space-between',
	},
	textUser: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	textStar: {
		fontSize: 14,
	},
	textReview: {
		fontSize: 14,
	},
	containerText: {
		width: '100%',
		flex: 1,
	},
})
