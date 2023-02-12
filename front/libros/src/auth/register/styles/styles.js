import { colors, UI, fontSizes } from "../../../utils/constants"

export const styles = {
    container: {
        marginTop: 50,
        padding: UI.formPadding,
    },
    title: {
        fontSize: fontSizes.title,
        marginTop: 10,
    },
    input: {
        borderColor: colors.textSecondary,
        borderBottomWidth: 1,
        marginTop: 3
    },
    pass: {
        position: "relative",
    },
    eye: {
        position: "absolute",
        right: 10,
    },
    error : {
        color: colors.danger,
    },
    btn : {
        borderRadius: UI.btnRadius,
        backgroundColor: colors.primary,
        marginTop: fontSizes.title,
        marginLeft: "auto",
        marginRight: "auto",
        padding: UI.btnPadding,
        width: UI.btnWidth,
    },
    btnTxt : {
        color: colors.background,
        textAlign: "center",
        fontSize: 16,
    },
    toLoginContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 10,
    },
    touchable: {
    },
    toLoginTitle: {
        fontSize: fontSizes.title,
    },
    touchableTxt: {
        color: colors.primary,
        fontSize: fontSizes.title,
    }
}