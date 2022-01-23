import React from 'react';
import { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import { HannaBtn } from './HannaBtn'

const ParkingMatch = () => {
    const [driver, setDriver] = useState('reciver');
    return (
        <View>
            <Text>{drivers[driver][0]}</Text>
            <HannaBtn onPress={matchBtn} title={drivers[driver][1]}></HannaBtn>
        </View>
    );
}

const matchBtn = () => {
    console.log('matchBtn');
}

const drivers = {
    reciver: ['Did you get to the parking spot?', 'Yes, I parked'],
    giver: ['Did you get out of the  parking spot?', 'Yes, I left'],
}