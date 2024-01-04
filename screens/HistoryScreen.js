import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { format, differenceInMinutes, differenceInSeconds } from "date-fns";
import { AppStyles } from "../styles/AppStyles";
import { useNavigation } from "@react-navigation/native";

const HistoryScreen = ({ route }) => {
	const navigation = useNavigation();
	const userData = route.params.userData; // ALL THE USER DATA, see firebase for structure
	const userTrips = userData.trips || []; // make it an array. MUST BE HERE FOR .length() to work or else CRASH

	// format seoconds into minutes:seconds
	const formatTime = (duration) => {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	// there are any trips to display
	const hasTrips = userTrips.length > 0;

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>History</Text>
			{hasTrips ? (
				<ScrollView style={styles.scrollView}>
					{userTrips.map((trip, index) => {
						const startDate = trip.start_time.toDate(); // Convert Firebase Timestamp obj to date
						const endDate = trip.end_time.toDate(); // same as above
						const durationInSeconds = differenceInSeconds(endDate, startDate);
						const durationFormatted = formatTime(durationInSeconds);
						const date = format(startDate, "PPP"); // Date in format 'Jan 1, 2020'
						const time = format(startDate, "p"); // Time in format '12:00 AM'

						return (
							<View key={index} style={styles.card}>
								<Text>Date: {date}</Text>
								<Text>Time: {time}</Text>
								<Text>Duration: {durationFormatted}</Text>
								<Text>Score: {trip.score}</Text>
							</View>
						);
					})}
				</ScrollView>
			) : (
				<Text style={styles.noTripsText}>No trips recorded yet.</Text>
			)}

			<TouchableOpacity
				style={AppStyles.backBtn}
				onPress={() => navigation.goBack()}
			>
				<Text style={AppStyles.backBtnText}>Back</Text>
			</TouchableOpacity>
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
	noTripsText: {
		fontSize: 18,
		color: "#ffffff",
		textAlign: "center",
		marginTop: 50,
	},
	scrollView: {
		marginBottom: 50,
		
	},
});

export default HistoryScreen;
