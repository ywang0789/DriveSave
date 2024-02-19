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


export default TrackingScreen;
