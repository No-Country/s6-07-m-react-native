import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		// position: 'absolute',
		// top: 0,
		// left: 0,
		// right: 0,
		// bottom: 0,
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
	},
	header: {
		backgroundColor: '#fff',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	arrrow: {
		marginLeft: 20,
		marginRight: 20,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#6427FF',
		padding: 10,
		marginTop: 20,
		borderRadius: 48,
		width: 350,
		height: 60,
		alignSelf: 'center',
	},
	card: {
		backgroundColor: '#fff',
		width: 219,
		height: 213,
		borderRadius: 16,
		marginTop: 10,
		alignItems: 'center',
	},
	elevation: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
	},
	cardText: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 15,
	},
	cardLocation: {
		fontSize: 12,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	containerImage: {
		width: 62,
		height: 62,
		borderRadius: 36,
		overflow: 'hidden',
		marginRight: 10,
		marginTop: 10,
	},
	containerReview: {
		marginTop: 10,
		height: 20,
		flexDirection: 'column',
	},
	buttonCard: {
		backgroundColor: '#6427FF',
		width: 171,
		height: 32,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
	textButtonCard: {
		color: '#fff',
		fontSize: 12,
		fontWeight: 'bold',
	},
	contentReview: {
		backgroundColor: '#fff',
		width: '95%',
		marginTop: 10,
	},
	titleReview: {
		fontSize: 16,
		alignSelf: 'flex-start',
		fontWeight: 'bold',
		color: '#6427FF',
        height: 40,
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
    contentContainer: {
  paddingBottom: 20,
    },
})
