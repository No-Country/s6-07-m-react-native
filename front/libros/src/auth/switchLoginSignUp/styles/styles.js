import { StyleSheet } from "react-native"
import { colors } from "../../../utils/constants"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		backgroundColor: colors.background,
		borderRadius: 20,
		paddingTop: 7,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		width: "48%"
	},
	logoTitle: {
		color: colors.primary,
		fontSize: 40,
	},
	switchContainer: {
		alignItems: "center",
		backgroundColor: colors.primary,
		borderRadius: 30,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		height: 50,
		marginTop: 40,
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 5,
		paddingRight: 5,
		width: "95%",
	},
	text: {
		color: colors.text,
		fontSize: 18,
		textAlign: "center",
	}
})