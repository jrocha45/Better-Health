//SignIn.js
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Logo from '../../assets/images/Logo.png';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';




const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const navigation = useNavigation(); 

  const onSignInPressed = () => {
    navigation.navigate('Home');
  }; 

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.root}>
            <Image 
            source={Logo} 
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"/>
            <CustomInput 
                placeholder="Username" 
                value={username} 
                setValue={setUsername}
                secureTextEntry={false}
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}
            />

            <CustomButton text="Sign In" onPress={onSignInPressed}/>
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    scrollViewContent:{
        flexGrow:1,
    },
    image:{
        marginHorizontal: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    logo: {
        marginTop:100,
        marginBottom:25,
        marginHorizontal:115,
        width: 200,
        maxHeight: 200,
        maxWidth: 200,
        
    },
    root: {
        backgroundColor:'#e2fdfc',
        flex: 1,
    }
})

export default SignIn;