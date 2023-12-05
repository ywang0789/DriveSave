import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const HistoryScreen = ({ route }) => {
  const userData = route.params.userData; // ALL THE USER DATA, see firebase for structure
  const userTrips = userData.trips; // array of trips
  const userTripsLength = userTrips.length; // number of trips
  const data = new Array(userTripsLength).fill(null);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>History</Text>
      <ScrollView style={styles.scrollView}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text>Date:</Text>
            <Text>Time:</Text>
            <Text>Duration:</Text>
            <Text>Score:</Text>
          </View>
        ))}
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
