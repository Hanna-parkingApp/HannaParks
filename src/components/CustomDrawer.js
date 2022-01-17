import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

//#E5F4F9
const CustomDrawer = (props) => {
    return (
        <View style={{flex: 1}}>
        <DrawerContentScrollView 
        {...props}
        contentContainerStyle = {{backgroundColor: '#E5F4F9'}}>
            <ImageBackground style={{padding:20}}>
                <Image source={require('../../assets/userprofile.jpg')} style={styles.profileImage} />
                <Text style={styles.username}>John Dong</Text>
            </ImageBackground>
            <View style = {styles.items}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
        <View>
            <Text>Our Custom View</Text>
        </View>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    profileImage: {
        height: 80,
        width:80,
        borderRadius: 40,
        marginBottom: 10,
    },
    username: {
        color: 'black',
        fontSize: 18,
        // fontFamily: 'Roboto-Medium',
    },
    items: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    }
})
