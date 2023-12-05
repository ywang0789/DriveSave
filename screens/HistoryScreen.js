import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { format, differenceInMinutes, differenceInSeconds } from "date-fns";

const HistoryScreen = ({ route }) => {
    const userData = route.params.userData; // ALL THE USER DATA, see firebase for structure
    const userTrips = userData.trips; // array of trips
    const userTripsLength = userTrips.length; // number of trips

    // format seoconds into minutes:seconds
    const formatTime = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>History</Text>
            <ScrollView style={styles.scrollView}>
                {userTrips.map((trip, index) => {
                    const startDate = trip.start_time.toDate(); // Convert Firebase Timestamp obj to date
                    const endDate = trip.end_time.toDate(); // same as above
                    const durationInSeconds = differenceInSeconds(
                        endDate,
                        startDate
                    );
                    const durationFormatted = formatTime(durationInSeconds);
                    const date = format(startDate, "PPP"); // Date in format 'Jan 1, 2020'
                    const time = format(startDate, "p"); // Time in format '12:00 AM'

                  return (
                        // create a card per each trip
                        <View key={index} style={styles.card}>
                            <Text>Date: {date}</Text>
                            <Text>Time: {time}</Text>
                            <Text>Duration: {durationFormatted}</Text>
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
        textAlign: "left",
        padding: 20,
        marginTop: 50,
    },
});

export default HistoryScreen;
