import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import FormInput from '../components/FormInput'
import { HannaBtn } from '../components/HannaBtn'
import HannaText from '../components/HannaText'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import RecoveryPasswordScreen from '../screens/RecoveryPasswordScreen';
import SpecificSharingScreen from '../screens/SpecificSharingScreen';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack'; 


const LoginScreen = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        console.log("Login Pressed")
    }
    const recoveryPassword = () => {
        console.log("recoveryPassword Pressed")
    }
    const signup = () => {
        navigation.navigate('Register')
        // console.log("signup Pressed")
    }
    return (
        <View>
            <View>
                <HannaText />
            </View>
                <View>
                <TouchableOpacity
                    style={styles.welcomeback}>
                <Text>Welcome Back!</Text>
                </TouchableOpacity> 
            </View>
            <View>
                <FormInput labelValue={email} placeholderText={"Enter your email address"} iconType={"user"}/>
                <FormInput labelValue={password} placeholderText={"Enter your password"} iconType={"lock"} />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress= {login}
                >
                    <Text>Log in</Text>
                </TouchableOpacity>     
            </View>
            <View>
            <TouchableOpacity
                    onPress= {recoveryPassword}
                >
                    <Text>Forget your password?</Text>
                </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity
                    onPress= {signup}>
                    <Text>Dont have a user? Sign up</Text>
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: '50%'
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#1e90ff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        
      },
    welcomeback: {
        fontSize: 100,
        fontWeight: "bold",
        fontFamily: "Cochin",
        alignItems: 'center'
    }
})
