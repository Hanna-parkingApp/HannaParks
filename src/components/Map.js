import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import BottomSearchBar from 'react-native-bottom-search-bar'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import FormInput from './FormInput'


const Map = (props) => {

    const {width, height, location} = props;

    const coordinates = [
        {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        },
        {
            latitude: location.coords.latitude + 1,
            longitude: location.coords.longitude + 1,
        }
    ]
    
    return (
        <>
            <MapView
                style = {{width, height}}
                loadingEnabled = {true}
                region = {{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
                }}
            >  
              <Marker 
                    title = "source"
                    coordinate= {{
                        latitude: coordinates[0].latitude,
                        longitude: coordinates[0].longitude,
                    }} 
                    />    
            <Marker coordinate = {coordinates[1]} title = "des" />
                
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
