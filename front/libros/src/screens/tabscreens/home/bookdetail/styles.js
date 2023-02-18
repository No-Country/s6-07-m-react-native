import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        alignItems: "center",

        backgroundColor: "#FF3D45",
        padding: 10,
        marginTop: 20,
        borderRadius: 48,
        width: 350,
        height: 60,
        alignSelf: "center",
        
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        height: 34,
        alignSelf: "center",
        marginTop: 10,
        
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});
