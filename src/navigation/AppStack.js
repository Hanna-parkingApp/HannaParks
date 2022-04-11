import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SpecificSharingScreen from '../screens/SpecificSharingScreen';
import Drawer from './Drawer';

const Stack = createNativeStackNavigator();

const AppStack = () => {

    return (
        <Stack.Navigator initialRouteName = "Drawer" screenOptions={{headerShown: false}}>
            <Stack.Screen name ="Drawer" component = {Drawer} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Share Parking" component={SpecificSharingScreen} />
            <Stack.Screen name="Sign Up" component={SignupScreen} />
        </Stack.Navigator> 

    )
}

export default AppStack;


