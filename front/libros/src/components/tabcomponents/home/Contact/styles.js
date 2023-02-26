import { colors, fontSizes, formStyles } from "../../../../utils/constants"

export const styles = {
    container: {
        height: "100%",
        paddingTop: 10,
        position: "relative",
    },
    bookCardContainer: {

    },
    inputContainer: {
        bottom: 5,
        width: "100%",
    },
    textInput: { 
        height: 100, 
        borderColor: colors.primary, 
        borderWidth: 1,
        fontSize: fontSizes.secondary,
        padding: 10,
        marginHorizontal: "8%",
        marginVertical: 5,
        borderRadius: 10,
    },
    button: {
        ...formStyles.btn,
        width: "60%",
        marginBottom: 25,
    },
    text: {
        fontSize: fontSizes.secondary,
        textAlign: "center",
        color: "gainsboro",
    }
}