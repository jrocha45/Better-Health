//SpecificWorkout.js
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import HomeButton from "../components/HomeButton/HomeButton";
import { useNavigation, useRoute } from '@react-navigation/native';

const SpecificWorkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [instances, setInstances] = useState([]);
  const [workoutId, setWorkoutId] = useState(null);
  const [buttonNames, setButtonNames] = useState([]);

  const onInstancePressed = () => {
    if (workoutId) {
      navigation.navigate('Instance', { workoutId: workoutId });
    } else {
      console.error('workoutId is not available');
    }
  };

  const onButtonPressed = (instance) => {
    console.log(`Date: ${instance.date}, Weight: ${instance.weight}`);
  };

  const fetchWorkoutId = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/getWorkoutIdByName?name=${encodeURIComponent(route.params?.buttonName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const workoutId = data.workoutId;
        setWorkoutId(workoutId);
        console.log('Received workoutId:', workoutId);
        fetchInstances(workoutId);
      } else if (response.status === 404) {
        console.warn('Workout not found');
        setInstances([]); 
      } else {
        console.error('Failed to fetch workoutId. Response status:', response.status);
        console.error('Response text:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching workoutId:', error);
    }
  };

  const fetchButtonNames = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/fetchWorkouts');
      if (response.ok) {
        const data = await response.json();
        setButtonNames(data);
      } else {
        console.error('Failed to fetch buttonNames. Response status:', response.status);
        console.error('Response text:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching buttonNames:', error);
    }
  };

  const fetchInstances = async (workoutId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/fetchInstances?workoutId=${workoutId}`);
      if (response.ok) {
        const data = await response.json();
        setInstances(data);
      } else {
        console.error('Failed to fetch instances. Response status:', response.status);
        console.error('Response text:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching instances:', error);
    }
  };

  useEffect(() => {
    if (!workoutId) {
      fetchWorkoutId();
    }

    fetchButtonNames();
    if (workoutId) {
      fetchInstances(workoutId);
    }
  }, [workoutId, route.params?.buttonName]);

  return (
    <ScrollView style={styles.container}>
      <HomeButton text="Create New Instance" onPress={onInstancePressed} style={styles.workout} />
      {instances.map((instance, index) => (
        <View key={index} style={styles.buttonContainer}>
          <HomeButton text={`Date: ${instance.date}, Weight: ${instance.weight}`} onPress={() => onButtonPressed(instance)} />
        </View>
      ))}
      {instances.length === 0 && <Text>No instances found</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2fdfc',
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default SpecificWorkout;
