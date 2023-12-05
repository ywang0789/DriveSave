import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const HomeScreen = () => {
  const drivingScore = 69; // constant for now.... TODO: replace with actual scor

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Update the timer every second
    const updateTimer = () => {
      const now = new Date();
      // time
      setCurrentTime(now.toLocaleTimeString());
      
      // date in mm/dd/yyyy format 
      const dateOptions = { year: "numeric", month: "long", day: "numeric" };
      setCurrentDate(now.toLocaleDateString(undefined, dateOptions));
    };
    updateTimer(); 
    const timerId = setInterval(updateTimer, 1000); // update every second
    return () => clearInterval(timerId); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
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
        padding={10}
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
    margin: 10,
    padding: 40,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10
  },
  icon: {
    width: 50,
    height: 50,
  },
  timeText: {
    fontSize: 18,
    color: "#333",
  },
  progressCircle: {
    
  },
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
