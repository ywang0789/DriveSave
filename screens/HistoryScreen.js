import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { format, differenceInSeconds } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../styles/AppStyles.js';

/**
 * HistoryScreen displays a list of user's past trips, each trip's date, start time, duration, and score.
 * It utilizes React Native components and date-fns library for formatting dates and times.
 */
const HistoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const userData = route.params.userData;
  const userTrips = userData.trips || [];

  /**
   * Formats trip duration from seconds to a string in "minutes:seconds" format.
   * @param {number} duration - The trip duration in seconds.
   * @returns {string} The formatted time string.
   */
  const formatTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  /**
   * Renders trip cards if there are any trips, otherwise displays a message indicating no trips.
   */
  const renderTrips = () => {
    if (userTrips.length > 0) {
      return userTrips.map((trip, index) => {
        const startDate = trip.start_time.toDate();
        const endDate = trip.end_time.toDate();
        const durationInSeconds = differenceInSeconds(endDate, startDate);
        const durationFormatted = formatTime(durationInSeconds);
        const date = format(startDate, 'PPP');
        const time = format(startDate, 'p');
        return (
          <View key={index} style={styles.card}>
            <Text>Date: {date}</Text>
            <Text>Time: {time}</Text>
            <Text>Duration: {durationFormatted}</Text>
            <Text>Score: {trip.score}</Text>
          </View>
        );
      });
    } else {
      return <Text style={styles.noTripsText}>No trips recorded yet.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>History</Text>
      <ScrollView style={styles.scrollView}>{renderTrips()}</ScrollView>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};


export default HistoryScreen;
