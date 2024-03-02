//Home.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import HomeButton from "../components/HomeButton/HomeButton";
const HomePage = require('../../assets/images/HomePage.jpeg');
import { useNavigation, useRoute } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [buttonNames, setButtonNames] = useState([]);

  const onWorkoutPressed = () => {
    navigation.navigate('Workout');
  };

  const onButtonPressed = async (name) => {
    console.log('Button name:', name);

    try {
      const response = await fetch(`http://localhost:3001/api/getWorkoutIdByName?name=${encodeURIComponent(name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const workoutId = data.workoutId;
        console.log('Received workoutId:', workoutId); 
        navigation.navigate('SpecificWorkout', { buttonName: name, workoutId });
      } else {
        console.error('Failed to fetch workoutId. Response status:', response.status);
        console.error('Response text:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching workoutId:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/fetchWorkouts');
        if (response.ok) {
          const data = await response.json();
          setButtonNames(data);
        } else {
          console.error('Failed to fetch workouts. Response status:', response.status);
          console.error('Response text:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [route.params?.newButtonName]);

  useEffect(() => {
    if (route.params?.newButtonName) {
      setButtonNames(prevState => [...prevState, route.params.newButtonName]);
    }
  }, [route.params?.newButtonName]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={HomePage}
          style={styles.img}
          resizeMode="contain"
        />
      </View>
      <HomeButton text="Add New Workout" onPress={onWorkoutPressed} />
      {buttonNames.map((name, index) => (
        <HomeButton key={index} text={name} onPress={() => onButtonPressed(name)} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    marginTop: 17,
    height: 150,
    width: '100%',
    borderRadius: 50,
    borderWidth: 0,
  },
  container: {
    backgroundColor: '#e2fdfc',
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
