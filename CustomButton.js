import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({onPress, text}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable >
    );
};

const styles = StyleSheet.create({
    container:{
        paddingVertical:10,
        

        backgroundColor: '#ff0000',
        alignItems:'center',
        marginVertical:5,
        marginHorizontal: 20,
        borderColor:'black',
        borderWidth: 1,
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        color: 'black',

    },
})

export default CustomButton;