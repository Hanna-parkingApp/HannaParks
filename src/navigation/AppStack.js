import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import RecoveryPasswordScreen from '../screens/RecoveryPasswordScreen';
import SpecificSharingScreen from '../screens/SpecificSharingScreen';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './Drawer';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName = "Drawer" screenOptions={{headerShown: false}}>
            <Stack.Screen name ="Drawer" component = {Drawer} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={SignupScreen} />
            <Stack.Screen name="Recovery Password" component={RecoveryPasswordScreen} />
            <Stack.Screen name="Share Parking" component={SpecificSharingScreen} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />

        </Stack.Navigator> 

    )
}

export default AuthStack;


