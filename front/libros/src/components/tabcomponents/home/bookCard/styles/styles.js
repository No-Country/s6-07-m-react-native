import { colors, UI } from '../../../../../utils/constants'

export const styles = {
	container: {
		alignItems: 'center',
		backgroundColor: colors.background,
		borderRadius: UI.cardRadius,
		display: 'flex',
		elevation: 2,
		padding: UI.btnPadding,
		paddingBottom: 3,
		paddingTop: 3,
		flexDirection: 'row',
		marginBottom: 20,
		maxWidth: 320,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	infoContainer: {
		padding: 5,
		width: '70%',
	},
	title: {
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 10,
	},
	authorContainer: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: 10,
		padding: 5,
		paddingLeft: 0,
	},
	avatarContainer: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
	},
	authorTitle: {
		fontWeight: 'bold',
		fontSize: 12,
	},
	avgContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	star: {
		margin: 2,
	},
	locationContainer: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	contactContainer: {
		borderTopWidth: 0.5,
		borderStyle: 'dashed',
		borderColor: colors.auxiliar,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 7,
	},
	img: {},
	contact: {
		color: colors.textSecondaryVariant,
		marginLeft: 5,
	},
}
