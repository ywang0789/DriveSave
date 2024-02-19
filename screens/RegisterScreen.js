import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {styles} from '../styles/AppStyles.js';

/**
 * RegisterScreen allows new users to create an account by providing their name, email, and password.
 * It uses Firebase Authentication for creating user accounts and Firestore for storing user details.
 */
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Registers a new user using Firebase Authentication and saves user details in Firestore.
   * On successful registration, navigates to the Login screen.
   */
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      // Creates a new document in Firestore in the users collection with user details.
      await setDoc(doc(db, 'users', uid), {
        name,
        email,
        uid,
      });
      navigation.navigate('Login'); // Navigate back to login screen upon successful registration.
    } catch (error) {
      alert(error.message); // Display error message if registration fails.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
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
