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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

    // registers user with firebase
  const handleRegister = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        const uid = userCredential.user.uid;
        
        // add new document to firestore in users collection
        await setDoc(doc(db, "users", uid), {
            name: name,
            email: username,
        });

      navigation.navigate("Login"); // back to login screen
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
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

export default RegisterScreen;
