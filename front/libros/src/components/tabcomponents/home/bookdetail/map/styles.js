import { StyleSheet } from "react-native";
import { widthPixel, heghtPixel, pixelSizeHorizontal, pixelSizeVertical, heightPixel } from "../../../../../utils/normalize";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f2 ",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 250,
        flexDirection: "column",
        marginTop: 1,
    },
    map: {
        width: "100%",
        height: heightPixel(197),
    },
    text: {
        color: "#263238",
        fontSize: 20,
    },
});

