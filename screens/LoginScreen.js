import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {styles} from '../styles/AppStyles.js';

/**
 * LoginScreen allows users to login with their email and password.
 * It uses Firebase Authentication for secure login and navigation to either the Home screen upon successful login or the Register screen for new users.
 */
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  /**
   * Handles the login process using Firebase Authentication.
   * Navigates to the Home screen on success or displays an error message on failure.
   */
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home', { userData: userCredential.user });
    } catch (error) {
      alert(error.message);
    }
  };

  /**
   * Navigates to the Register screen for new users.
   */
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DriveSave</Text>
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
