import React from "react";
import { View, Text , StyleSheet, Pressable} from "react-native";

const HomeButton = ({onPress, text}) => {
    return(
       <Pressable onPress= {onPress} style= {styles.container}>
            <Text style = {styles.text}> {text} </Text>
       </Pressable>
    );
};

const styles = StyleSheet.create ({
    container: {
        paddingVertical:10,
        
        height:90,
        backgroundColor: '#ff0000',
        alignItems:'center',
        justifyContent: 'center',
        marginVertical:17,
        marginHorizontal: 20,
        borderColor:'black',
        borderWidth: 1,
        borderRadius: 5,
    },

    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
})

export default HomeButton;