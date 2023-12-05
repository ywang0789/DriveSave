import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { format, formatDuration, intervalToDuration } from "date-fns";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

const TrackingScreen = ({ route }) => {
    const userData = route.params.userData; // ALL THE USER DATA, see firebase for structure
    const uid = userData.uid;
    const [timerValue, setTimerValue] = useState(0);
    const timerRef = useRef(null); // Ref for timer 

    const [mapRegion, setMapRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const mapRef = useRef(null); // Ref for  MapView

    ///////////////////////////////////////fucntions start/////////////////////////////////////////////////////////////////
    // update location function
    const updateLocation = async () => {
        // ask for permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        // get current location
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
        });

        // update map region
        const newMapRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };
        setMapRegion(newMapRegion);
    };

    // calls updateLocation every second
    useEffect(() => {
        updateLocation();

        // call updateLocation every second
        const intervalId = setInterval(() => {
            updateLocation();
        }, 1000);

        // reset timer
        return () => clearInterval(intervalId);
    }, []);

    // reset camera to current location
    const handleResetCamera = () => {
        mapRef.current.animateToRegion(mapRegion, 500);
    };

    // start tracking
    const handleStart = () => {
        const start = new Date();
        console.log("Start time: ", start);

        // Start timer 
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setTimerValue((prev) => prev + 1); // Increment timer every second
            }, 1000);
        }
    };

    // stop tracking
    const handleStop = async () => {
        const end = new Date();
        console.log("End time: ", end);

        // Stop timer
        clearInterval(timerRef.current);
        timerRef.current = null;

        // make a new trip entry
        const newTrip = {
            start_time: start, 
            end_time: end, 
            score: 50,
        };

        // Save the new trip to the db in 'trips' field under the users
        const userRef = doc(db, "users", userData.uid);
        await updateDoc(userRef, {
            trips: arrayUnion(newTrip),
        });
    };

    // Format time in seconds to MM:SS
    const formatTime = (totalSeconds) => {
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tracking</Text>

            <View style={styles.mapContainer}>
                <MapView style={styles.map} region={mapRegion} ref={mapRef}>
                    <Marker coordinate={mapRegion} />
                </MapView>
            </View>
            <View style={styles.midContainer}>
                <View style={styles.card}>
                    <Text style={styles.timerText}>
                        Time: {formatTime(timerValue)}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.resetIcon}
                    onPress={handleResetCamera}
                >
                    <Icon name="crosshairs-gps" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
                    <Text style={styles.startBtnText}>START</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
                    <Text style={styles.startBtnText}>STOP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8fd9a8",
        alignItems: "stretch",
    },
    map: {
        width: "100%",
        height: "100%",
        padding: 10,
        margin: 10,
    },
    midContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    card: {
        backgroundColor: "#fff",
        width: "50%",
        borderRadius: 8,
        alignItems: "center",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    timerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        padding: 20,
        textAlign: "left",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        marginTop: 40,
        padding: 20,
        textAlign: "left",
    },
    mapContainer: {
        width: "80%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        padding: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,

        margin: 10,
    },
    resetIcon: {
        backgroundColor: "#6c63ff",
        padding: 10,
        margin: 10,
        alignSelf: "flex-end",
        borderRadius: 50,
    },
    btnContainer: {
        alignItems: "center",

        padding: 10,
    },
    startBtn: {
        marginTop: 12,
        backgroundColor: "#6c63ff",
        width: "70%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    startBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    stopBtn: {
        marginTop: 12,
        backgroundColor: "#7f0000",
        width: "50%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    stopBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default TrackingScreen;
