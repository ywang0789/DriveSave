import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { format, differenceInMinutes } from "date-fns";

const HistoryScreen = ({ route }) => {
  const userData = route.params.userData; // ALL THE USER DATA, see firebase for structure
  const userTrips = userData.trips; // array of trips
  const userTripsLength = userTrips.length; // number of trips
  const data = new Array(userTripsLength).fill(null);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>History</Text>
      <ScrollView style={styles.scrollView}>
        {userTrips.map((trip, index) => {
          const startDate = trip.start_time.toDate(); // Convert Firebase Timestamp to JS Date
          const endDate = trip.end_time.toDate();
          const duration = differenceInMinutes(endDate, startDate);
          const date = format(startDate, "PPP"); // Date in format 'Jan 1, 2020'
          const time = format(startDate, "p"); // Time in format '12:00 AM'

          return (
            <View key={index} style={styles.card}>
              <Text>Date: {date}</Text>
              <Text>Time: {time}</Text>
              <Text>Duration: {duration} minutes</Text>
              <Text>Score: {trip.score}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fd9a8",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 50,
  },
});

export default HistoryScreen;
