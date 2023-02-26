import { colors, UI, fontSizes } from "../../../../utils/constants"

export const styles = {
    container: {
        alignItems: "center",
        backgroundColor: colors.background,
        borderRadius: 10,
        elevation: 1,
        height: 200,
        marginHorizontal: "8%",
        marginVertical: 10,
        paddingTop: 5,
        position: "relative",
    },
    title: {
        fontFamily: "Roboto-Black",
        fontSize: fontSizes.secondary,
        marginBottom: 5,
        marginTop: 10,
        textAlign: "center",
    },
    iconContainer: {
        alignItems: "center",
        borderRadius: 60,
        elevation: 2,
        height: 50,
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: 50,
        padding: 5,
        shadowColor: colors.primary,
        backgroundColor: colors.textSecondary,
    },
    tips: {
        color: colors.textSecondaryVariant,
        padding: 10,
    },
    close: {
        position: "absolute",
        right: 10,
        top: 10,
    }
}