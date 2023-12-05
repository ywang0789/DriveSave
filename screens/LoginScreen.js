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


const LoginScreen = () => {
  const [username, setUsername] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Authenticate the user
      await signInWithEmailAndPassword(auth, username, password);
      // Navigate to another screen upon successful login
      navigation.navigate('Home'); // replace 'Home' with your desired screen
    } catch (error) {
      // Handle errors here
      alert(error.message);
    }
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
