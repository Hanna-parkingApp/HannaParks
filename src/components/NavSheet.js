import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import { HannaBtn } from '../components/HannaBtn'

const NavSheet = ({}) => {
    const [arrivalTime, setArrivalTime] = useState();
    const [departureTime, setLeaveTime] = useState();

    const cancel = () => {
        console.log('cancelled');
    }

    return (
        <View style={styles.bottomSection}>
            <View style={styles.bottomLeft}>
                <Text>Estimated arrival time: {arrivalTime}</Text>
                <Text>Estimated leave time: {departureTime}</Text>
            </View>
            <HannaBtn onPress={cancel} title="Cancel" style="redBtn"></HannaBtn>
        </View>
    );
}

export default NavSheet;

const styles = StyleSheet.create({
    bottomSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 10
   },
   
    bottomLeft: {},
})