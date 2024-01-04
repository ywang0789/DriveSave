// TODO: move and organize styles to styles/AppStyles.js
// TODO: import this to all screens 

import { StyleSheet } from 'react-native';

export const AppStyles = StyleSheet.create({
    // TODO: Add styles here
    // in progress..........
    container: {
        flex: 1,
        backgroundColor: "#8fd9a8", // Updated background color
        padding: 20,
        justifyContent: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        color: "#333",
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
    },
    logoutBtn: {
        marginTop: 12,
        backgroundColor: "#7f0000",
        width: "100%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    logoutBtnText: {
        color: "#ffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "left",
        padding: 20,
    },
    backBtnText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    backBtn: {
        margin: 12,
        backgroundColor: "#fff",
        width: "50%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "center",
    },
});
