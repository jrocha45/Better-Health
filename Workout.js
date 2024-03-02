//Workout.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Workout = () => {
    const navigation = useNavigation();
    const [newButtonName, setNewButtonName] = useState('');

    const saveButton = async () => {
        await fetch('http://localhost:3001/api/createWorkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ buttonName: newButtonName }),
        });

        navigation.navigate('Home', { newButtonName });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter New Workout Name"
                value={newButtonName}
                onChangeText={setNewButtonName}
            />
            <Button title="Add" onPress={saveButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        padding: 16,
        backgroundColor: '#e2fdfc',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});

export default Workout;
