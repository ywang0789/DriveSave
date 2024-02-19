import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import {styles} from '../styles/AppStyles.js';

/**
 * TrackingScreen allows users to track their driving route, start and stop tracking, and submit a driving score.
 * It utilizes Expo's Location API for real-time location updates and Firebase Firestore for storing trip data.
 */
const TrackingScreen = ({ route }) => {
  const navigation = useNavigation();
  const userData = route.params.userData;
  const [modalVisible, setModalVisible] = useState(false);
  const [userScore, setUserScore] = useState('');
  const [timerValue, setTimerValue] = useState(0);
  const timerRef = useRef(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const mapRef = useRef(null);

  useEffect(() => {
    const updateLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    };
    updateLocation();
    const intervalId = setInterval(updateLocation, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const startTracking = () => {
    const startTime = new Date();
    setTimerValue(0);
    timerRef.current = setInterval(() => {
      setTimerValue((prev) => prev + 1);
    }, 1000);
  };

  const stopTracking = async () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    const endTime = new Date();
    setModalVisible(true);
  };

  const submitScore = async () => {
    const score = parseInt(userScore, 10);
    if (isNaN(score) || score < 0 || score > 100) {
      alert('Please enter a valid score');
      return;
    }
    // Save trip data to Firebase Firestore
    const tripData = {
      startTime,
      endTime,
      score,
    };
    await updateDoc(doc(db, 'users', userData.uid), {
      trips: arrayUnion(tripData),
    });
    setModalVisible(false);
    setUserScore('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* MapView, tracking controls, and modal code goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#8fd9a8",
		alignItems: "stretch",
	},
	map: {
		width: "100%",
		height: "100%",
		padding: 10,
		margin: 10,
	},
	midContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	card: {
		backgroundColor: "#fff",
		width: "50%",
		borderRadius: 8,
		alignItems: "center",
		alignSelf: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	timerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
		padding: 20,
		textAlign: "left",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#ffffff",
		marginTop: 40,
		padding: 20,
		textAlign: "left",
	},
	mapContainer: {
		width: "80%",
		height: "50%",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		padding: 10,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 10,

		margin: 10,
	},
	resetIcon: {
		backgroundColor: "#6c63ff",
		padding: 10,
		margin: 10,
		alignSelf: "flex-end",
		borderRadius: 50,
	},
	btnContainer: {
		alignItems: "center",

		padding: 10,
	},
	startBtn: {
		marginTop: 12,
		backgroundColor: "#6c63ff",
		width: "70%",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	startBtnText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	stopBtn: {
		marginTop: 12,
		backgroundColor: "#7f0000",
		width: "50%",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	disabledStopBtn: {
		marginTop: 12,
		backgroundColor: "#7f0000",
		width: "50%",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		opacity: 0.5,
	},
	stopBtnText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},

	mainModalView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: 200,
	},
	modalText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 20,
	},
	modalBtn: {
		marginTop: 12,
		backgroundColor: "#6c63ff",
		width: "100%",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	modalBtnText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default TrackingScreen;
