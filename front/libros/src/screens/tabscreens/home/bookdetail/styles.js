import { StyleSheet } from "react-native";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical } from "../../../../utils/normalize";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#6427FF",
        marginTop: pixelSizeVertical(8),
        borderRadius: 40,
        width: widthPixel(254),
        height: heightPixel(48),
        alignSelf: "center",
        marginBottom: 80,
    },
    text: {
        color: "white", 
        fontSize: 16,
        fontWeight: "bold",
        height: 34,
        alignSelf: "center",
        marginTop: 10,
        
    },
});
