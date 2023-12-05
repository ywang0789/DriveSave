import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 


const HomeScreen = ({ route }) => {
  const drivingScore = 69; // constant for now.... TODO: replace with actual scor
  const userData = route.params.userData; // ALL THE USER DATA, see firebase for structure
  const userName = userData.name;

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Update the time every second
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
      <Text style={styles.welcomeText}>Welcome {userName}!</Text>
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
      <View style={styles.dock}>
        <Icon
          name="account"
          size={40}
          color="#000"
          onPress={() => {
            /* Handle press for Icon 1 */
          }}
        />
        <Icon
          name="play-circle-outline"
          size={80}
          color="#000"
          onPress={() => {
            /* Handle press for Icon 2 */
          }}
        />
        <Icon
          name="history"
          size={40}
          color="#000"
          onPress={() => {
            /* Handle press for Icon 3 */
          }}
        />
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
    elevation: 5
  },
});

export default HomeScreen;
