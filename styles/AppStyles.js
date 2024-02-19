// TODO: move and organize styles to styles/AppStyles.js
// TODO: import this to all screens 

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8fd9a8',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 40,
    },
    input: {
      backgroundColor: '#fff',
      width: '100%',
      padding: 15,
      borderRadius: 8,
      fontSize: 16,
      marginBottom: 20,
    },
    loginBtn: {
      backgroundColor: '#6c63ff',
      width: '100%',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    loginBtnText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    registerBtn: {
      marginTop: 12,
      backgroundColor: '#fff',
      width: '100%',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    registerBtnText: {
      color: '#6c63ff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontSize: 18,
      color: '#333',
      marginBottom: 10,
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'left',
      padding: 20,
    },
  });

  
  