import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CustomDrawer from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import SpecificSharingScreen from "../screens/SpecificSharingScreen"; 

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <Drawer.Navigator 
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
            drawerLabelStyle: {marginLeft: 15, fontSize: 15},
            drawerActiveBackgroundColor: '#48D1CC',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            headerShown: false
            }}>
            <Drawer.Screen 
            name='Home' 
            component={HomeScreen} 
            options={{
                drawerIcon: ({color}) => (
                  <Ionicons name="home-outline" size={22} color={color} />
                ),
              }}
            />
            <Drawer.Screen 
            name='Profile' 
            component={ProfileScreen} />
            <Drawer.Screen 
            name="Share Parking"
            component={SpecificSharingScreen} />
          
        </Drawer.Navigator>
    )
}

export default DrawerNav;
