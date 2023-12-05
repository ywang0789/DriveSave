import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const AccountScreen = ({ route }) => {
    const navigation = useNavigation();

    const userData = route.params.userData; // ALL THE USER DATA, see firebase for structure
    const userName = userData.name;
    const userEmail = userData.email;

    // logs user out and navigates to login screen
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Logged out!");
                navigation.navigate("Login");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Account Summary</Text>
            <View style={styles.card}>
                <Text style={styles.text}>Name: {userName}</Text>
                <Text style={styles.text}>Email: {userEmail} </Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default AccountScreen;
