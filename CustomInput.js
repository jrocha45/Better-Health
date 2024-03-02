import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

const CustomInput = ({value, setValue,placeholder, secureTextEntry}) => {
    return(
        <View style = {styles.container}>
            <TextInput
                value ={value}
                onChangeText={setValue}
                placeholder = {placeholder}
                style = {styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e2fdfc',
        width: 390,
        height:40,

        borderColor:'black',
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,

        marginVertical: 5,
        paddingLeft:10,
        paddingRight:10,
        paddingVertical:10,
    },
    input: {},
})

export default CustomInput;