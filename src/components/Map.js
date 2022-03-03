import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import BottomSearchBar from 'react-native-bottom-search-bar'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import FormInput from './FormInput'
import MapViewDirections from 'react-native-maps-directions';
import { GoogleMapKey as GOOGLE_API_KEY } from '../constants/googleMapKey';


const Map = (props) => {

    const {width, height, myLocation, desLocation} = props;
    console.log("line 12")
    console.log(myLocation)
    console.log("line 14")
    console.log(desLocation);
    console.log(GOOGLE_API_KEY)
    
    

    const coordinates = [
        {
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
        },
        {
            latitude: myLocation.latitude + 1,
            longitude: myLocation.longitude + 1,
        }
    ]
    
    return (
        <>
            <MapView
                style = {{width, height}}
                loadingEnabled = {true}
                region = {{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
                }}
            >  
              <Marker 
                    title = "source"
                    coordinate= {coordinates[0]} 
                />
            {desLocation ? (
                <Marker coordinate = {desLocation} title = "des" />
                
            ): (
                null
            )}
            {desLocation ? (
                <MapViewDirections 
                origin={myLocation}
                destination={desLocation}
                apikey={GOOGLE_API_KEY}
                strokeWidth = {3}
                strokeColor = "hotpink"
                />
                
            ): (
                null
            )}  
            </MapView>          
        </> 
    )
}

export default Map

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 10, 
        width: '100%', 
    },
    search: {
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
    }
})
