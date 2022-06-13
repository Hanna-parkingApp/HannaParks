    import React, { useEffect } from 'react'
    import { View } from 'react-native'
    import { createNativeStackNavigator } from '@react-navigation/native-stack'
    import HomeScreen from '../screens/HomeScreen';
    import SignupScreen from '../screens/SignupScreen';
    import Drawer from './Drawer';
    import FindDestinationScreen from '../screens/FindDestinationScreen';
    import ShareParkingScreen from '../screens/ShareParkingScreen';
    import RecoveryPassword from '../screens/RecoveryPasswordScreen';
    import { spring } from 'react-native-reanimated';

    const Stack = createNativeStackNavigator();

    const AppStack = () => {

        useEffect(() => {
            console.log("======= invoked");
        },[])

        return (
            <Stack.Navigator initialRouteName = "Drawer" screenOptions={{headerShown: false}}>
                <Stack.Screen name ="Drawer" component = {Drawer} />
                <Stack.Screen name="Share-Parking" component={ShareParkingScreen} />
                <Stack.Screen name="Find Destination" component={FindDestinationScreen} />
            </Stack.Navigator>
        )

        // return (
        //     // <View style={{backgroundColor: 'red', flex: 1}}>
        //         <Stack.Navigator initialRouteName = "Drawer" screenOptions={{headerShown: false}}>
        //         <Stack.Screen name ="Drawer" component = {Drawer} />
        //         <Stack.Screen name="Share-Parking" component={ShareParkingScreen} />
        //         <Stack.Screen name="Find Destination" component={FindDestinationScreen} />
        //     </Stack.Navigator>      
        //     {/* </View> */}
        //)
    }

    export default AppStack;