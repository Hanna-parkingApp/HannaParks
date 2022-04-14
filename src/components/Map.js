import React, { useRef } from 'react'
import { StyleSheet, Image } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GoogleMapKey as GOOGLE_API_KEY } from '../constants/googleMapKey';
import imagePath from '../constants/imagePath';


const Map = (props) => {

    const {width, height, myLocation, desLocation} = props;
    
    const markerRef = useRef();
    

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
              <Marker.Animated 
                    ref={markerRef}
                    title = "source"
                    coordinate= {coordinates[0]} 
                >
                    <Image 
                        source={imagePath.icCurLoc}
                        style = {styles.icCar}
                    />
                </Marker.Animated>
            {desLocation ? (
                <Marker coordinate = {desLocation} title = "des" />
                
            ): (
                null
            )}
            {desLocation.latitude !== 0 ? (
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
    }, 
    icCar: {
        width: 30,
        height: 30,
    }
})
