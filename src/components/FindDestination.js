import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import AddressPickup from "./AddressPickup";
import { changeDesState } from "../features/location/locationSlice";

const FindDestination = (props) => {

    const { placeholderText } = props;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const fetchDestinationCoords = async (lat, lng, city_name, st_name) => {
        console.log("city ==> ", city_name);
        console.log('street, ', st_name);
        let desLocation = {
            latitude: lat,
            longitude: lng,
            generalLoc: city_name
        }
        dispatch(changeDesState(desLocation));
        //navigation.navigate('Home');
    }

    return (
        <View style = {styles.container}>
            <FlatList
            ListHeaderComponent={
            <>
             <View style = {{ marginBottom: 16 }} />
                <AddressPickup 
                 placeholderText={placeholderText}
                 fetchAddress = {fetchDestinationCoords}
                /> 
            </>}
            keyboardShouldPersistTaps='handled'
            style = {{ flex: 1, padding: 24}}
            >
                 
            </FlatList>
        </View>
    )
};

export default FindDestination;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});