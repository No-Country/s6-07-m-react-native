import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		paddingTop: 7,
		paddingBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		width: "48%"
	},
	logoTitle: {
		color: "#6559E5",
		fontSize: 40,
	},
	switchContainer: {
		alignItems: "center",
		backgroundColor: "#6559E5",
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
		color: "black",
		fontSize: 18,
		textAlign: "center",
	}
})