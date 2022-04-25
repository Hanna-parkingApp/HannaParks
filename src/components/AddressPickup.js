import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleMapKey as GOOGLE_MAP_KEY } from '../constants/google-map-api/googleMapKey';

const AddressPickup = ({ placeholderText, fetchAddress }) => {

    const onPressAddress = (data, details) => {
        
        console.log("************");
        let city, street,streetNum;
        let address_components = details.address_components;

        city = address_components.find(element => element.types[0]==="locality").long_name;
        street = address_components.find(element => element.types[0]==="route").short_name  ;        
        streetNum =  address_components.find(element => element.types[0]==="street_number").short_name;
        
        let geometry = details.geometry;
        let lat = geometry.location.lat;
        let lng = geometry.location.lng;

        fetchAddress(lat,lng,city,street);
    }
    

    const onAutoCompleteFailure = () => {
        console.log("auto complete failure!");
        return (
            <View>
                <Text>Auto complete failure!</Text>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
            <GooglePlacesAutocomplete 
            placeholder= {placeholderText}
            onPress = {onPressAddress}
            fetchDetails = {true}
            query = {{
                key: GOOGLE_MAP_KEY,
                language: 'en'
            }}
            onFail = {onAutoCompleteFailure}
            styles = {{
                textInputContainer: styles.containerStyle,
                textInput: styles.textInputStyle,
            }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#f3f3f3'
    }
});

export default AddressPickup;