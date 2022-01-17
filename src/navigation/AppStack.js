import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CustomDrawer from '../components/CustomDrawer';
import RoundIconButton from '../components/RoundIconButton'
import { AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name='Home' component={HomeScreen} options={{
                drawerIcon: ({color}) => {
                    <AntDesign name='home' size={24} />
                }
            }} />
            <Drawer.Screen name='Login' component={LoginScreen} />
            <Drawer.Screen name='Sign up' component={SignupScreen} />

        </Drawer.Navigator>
    )
}

export default AppStack;

