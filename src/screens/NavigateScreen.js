import React from 'react'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import Map from '../components/Map'
import { HannaBtn } from '../components/HannaBtn'
import FormInput from '../components/FormInput'
import ParkingMatch from '../components/ParkingMatch';

const NavigateScreen = () => {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [leaveTime, setLeaveTime] = useState();

    const cancel = () => {
        console.log('cancelled');
    }

    return (
        <View>
            <View styles={styles.topSection}>
                <FormInput labelValue={from} placeholderText={"Where are you now?"} />
                <FormInput labelValue={to} placeholderText={"Where are going?"} />
            </View>
            <SafeAreaView style={styles.map}>
                <Map />
            </SafeAreaView>
            <View style={styles.bottomSection}>
                <View style={styles.bottomLeft}>
                    <Text>Estimated arrival time: {arrivalTime}</Text>
                    <Text>Estimated leave time: {leaveTime}</Text>
                </View>
                <HannaBtn onPress={cancel} title="Cancel" style="redBtn"></HannaBtn>
            </View>
        </View>
    );
}

export default NavigateScreen;

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
   topSection: {},
   map: {
        height: windowHeight * .6
   },
   bottomSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 10
   },
   bottomLeft:{}
});