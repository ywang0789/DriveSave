import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { set } from "date-fns";

const HomeScreen = ({ route }) => {
  const navigator = useNavigation();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [userData, setUserData] = useState(route.params.userData);
  const [drivingScore, setDrivingScore] = useState(0);
  
  const userName = userData.name;

  // fetch new user data from firestore
  const fetchUserData = async () => {
    const docRef = doc(db, "users", userData.uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const fetchedUserData = docSnapshot.data();
      setUserData(fetchedUserData);
      // Calculate average driving score
      if (fetchedUserData.trips && fetchedUserData.trips.length > 0) {
        const totalScore = fetchedUserData.trips.reduce((sum, trip) => sum + trip.score, 0);
        const averageScore = totalScore / fetchedUserData.trips.length;
        setDrivingScore(averageScore);
      } else {
          console.log("No trips found!");
        }
    } else {
      console.log("No such document!");
    }
  };

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

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleAccountPress = () => {
    navigator.navigate("Account", { userData });
  };

  const handleHistoryPress = () => {
    navigator.navigate("History", { userData });
  };

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
          onPress={handleAccountPress}
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
          onPress={handleHistoryPress}
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
    elevation: 5,
  },
});

export default HomeScreen;
