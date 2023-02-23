import { colors } from "../../../../../../../utils/constants"

export const styles = {
    containerTransmitter: {
        /* alignItems: "flex-end", */
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 30,
        borderBottomColor: colors.background,
        borderBottomWidth: 0,
        borderTopColor: colors.primary,
        borderTopLeftRadius: 10,
        borderTopWidth: 10,
        borderLeftColor: colors.background,
        borderLeftWidth: 0,
        borderRightColor: colors.background,
        borderRightWidth: 6,
        /* flexDirection: "row", */
        height: "auto",
        marginBottom: 30,
        marginLeft: "auto",
        marginRight: 10,
    },
    containerReceiver: {
        alignItems: "flex-start",
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 26,
        borderBottomColor: colors.background,
        borderBottomWidth: 0,
        borderStyle: 'solid',
        borderTopColor: colors.primary,
        borderTopRightRadius: 10,
        borderTopWidth: 10,
        borderLeftColor: colors.background,
        borderLeftWidth: 6,
        borderRightColor: 'green',
        borderRightWidth: 0,
        flexDirection: "row",
        height: "auto",
        marginBottom: 30,
        marginLeft: 10,
        marginRight: "auto"
    },
    text: {
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 0,
        bottom: 15,
        color: "gainsboro",
        fontSize: 18,
        height: "auto",
        maxWidth: "90%",
        padding: 5,
        paddingBottom: 15,
        paddingLeft: 10,
        position: "relative",
        top: -1,
        width: "auto",
    }
}