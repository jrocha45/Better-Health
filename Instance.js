//Instance.js
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput, Button } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';

const Instance = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutId, setWorkoutId] = useState(route.params?.workoutId || null);
  const [instances, setInstances] = useState([]);

  const onAddPressed = async () => {
    if (date !== '' && weight !== '' && workoutId) {
      try {
        const response = await fetch('http://localhost:3001/api/createInstance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date, weight, workoutId }),
        });

        if (response.ok) {
          fetchInstances(workoutId);
          navigation.navigate('SpecificWorkout', { newInstanceData: { date, weight } });
        } else {
          console.error('Failed to create instance');
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
    if (workoutId) {
      fetchInstances(workoutId);
    }
  }, [workoutId]);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter date"
        onChangeText={text => setDate(text)}
        value={date}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        onChangeText={text => setWeight(text)}
        value={weight}
      />
      <Button title="Add" onPress={onAddPressed} />

      <Text style={styles.heading}>Instances:</Text>
      {instances.map((instance, index) => (
        <View key={index} style={styles.instanceContainer}>
          <Text>{`Date: ${instance.date}, Weight: ${instance.weight}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2fdfc',
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  instanceContainer: {
    marginVertical: 10,
  },
});

export default Instance;
