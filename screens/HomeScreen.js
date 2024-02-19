import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import {styles} from '../styles/AppStyles.js';

/**
 * HomeScreen displays the main interface for the user, including a welcome message,
 * the current time and date, their driving score, and navigation buttons to other screens.
 */
const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [userData, setUserData] = useState(route.params.userData);
  const [drivingScore, setDrivingScore] = useState(0);

  // Fetches user data from Firestore and updates the driving score.
  const fetchUserData = async () => {
    const docRef = doc(db, 'users', userData.uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const fetchedUserData = docSnapshot.data();
      setUserData(fetchedUserData);

      if (fetchedUserData.trips && fetchedUserData.trips.length > 0) {
        const totalScore = fetchedUserData.trips.reduce((sum, trip) => sum + trip.score, 0);
        const averageScore = totalScore / fetchedUserData.trips.length;
        setDrivingScore(averageScore);
      }
    }
  };

  // Updates the current time every second.
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Refetches user data when the screen is focused.
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  // Handles navigation button presses.
  const handleAccountPress = () => navigation.navigate('Account', { userData });
  const handleHistoryPress = () => navigation.navigate('History', { userData });
  const handlePlayPress = () => navigation.navigate('Track', { userData });

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {userData.name}!</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{currentTime}</Text>
        <Text style={styles.timeText}>{currentDate}</Text>
      </View>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={drivingScore}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        padding={10}>
        {(fill) => (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Your Driving Score</Text>
            <Text style={styles.score}>{Math.round(fill)}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={styles.dock}>
        <Icon name="account" size={40} color="#000" onPress={handleAccountPress} />
        <Icon name="play-circle-outline" size={80} color="#000" onPress={handlePlayPress} />
        <Icon name="history" size={40} color="#000" onPress={handleHistoryPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8fd9a8",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
    },
    timeContainer: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        padding: 40,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    icon: {
        width: 50,
        height: 50,
    },
    timeText: {
        fontSize: 18,
        color: "#333",
    },
    progressCircle: {},
    scoreContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    scoreText: {
        fontSize: 18,
        color: "#333",
    },
    score: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
    },
    dock: {
        position: "absolute",
        alignItems: "center",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: 30,
        backgroundColor: "#fff",
        padding: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default HomeScreen;
