import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = () => {
  const [username, setUsername] = useState("test@test.com"); // default username for testing
  const [password, setPassword] = useState("123456"); // default password for testing
  const navigation = useNavigation();

  // logs user in with firebase
  const handleLogin = async () => {
    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const uid = userCredential.user.uid;

      // fetch user data from firestore
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        // upon successful login -> go to home screen
        navigation.navigate("Home", { userData: docSnap.data() }); // passing user data to home screen
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      // Handle errors here
      alert(error.message);
    }
  };

  // simply navigates to register screen
  const handleRegister = async () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DriveSave</Text>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerBtnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fd9a8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: "#6c63ff",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerBtn: {
    marginTop: 12,
    backgroundColor: "#ffff",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  registerBtnText: {
    color: "#6c63ff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
