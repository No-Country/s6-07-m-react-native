export const colors = {
    primary: "#6427FF",
    secondary: "rgba(100, 39, 255, 0.4)",
    background: "#FFFFFF",
    text: "rgba(0, 0, 0, 0.9)",
    textSecondary: "rgba(0, 0, 0, 0.1)",
    border: "",
    danger: "#EA1111",
    warning: "#757575"
}

export const UI = {
    formPadding: 20,
    btnRadius: 20,
    btnWidth: "48%",
    btnPadding: 10,
}

export const fontSizes = {
    title: 16,
}

export const formStyles = {
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