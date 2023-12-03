import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const HomeScreen = () => {
  const drivingScore = 69; // constant for now.... TODO: replace with actual score

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome User!</Text>
      <View style={styles.timeContainer}>
        <Image
          style={styles.icon}
          source={require("./test.png")} // TODO: replace with actual icon
        />
        <Text style={styles.timeText}>8:02:09 AM</Text>
        <Text style={styles.dateText}>Today: 36th November 1984</Text>
      </View>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={drivingScore}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        padding={10}
        style={styles.progressCircle}
      >
        {(fill) => (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Your Driving Score</Text>
            <Text style={styles.score}>{Math.round(fill)}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8fd9a8",
    alignItems: "center",
    justifyContent: "space-around",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  timeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  timeText: {
    fontSize: 18,
    color: "#ffffff",
  },
  dateText: {
    fontSize: 16,
    color: "#ffffff",
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
});

export default HomeScreen;
