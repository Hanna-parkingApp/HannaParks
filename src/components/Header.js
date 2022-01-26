import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HannaText from './HannaText';
import { useNavigation } from '@react-navigation/native';

const Header = () => {

    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    const openMenu = () => {
        navigation.openDrawer();
    }
  return (
    <View style = {[styles.header, height]}>
        <Ionicons name="menu" size={28} onPress={openMenu} style = {styles.icon} />
        <HannaText />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    icon: {
        position: 'absolute',
        left: 16
    }
});