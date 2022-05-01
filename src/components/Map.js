import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GoogleMapKey as GOOGLE_API_KEY } from '../constants/google-map-api/googleMapKey';
import imagePath from '../constants/imagePath';
import hannaServer from "../api/hannaServer";
import { useSelector } from 'react-redux';
import { selectLocation } from '../features/location/locationSlice';
import { add_minutes } from '../constants/helpers/helperFunctions';

const Map = (props) => {

    
    const {width, height,request, setCarDetailsModal} = props;
    const [nearbyParking, setNearbyParking] = useState([]);
    const [showParking, setShowParking] = useState(false);

    const userLocation = useSelector(selectLocation);
    
    const markerRef = useRef();    

    const coordinates = [
        {
            latitude: userLocation.src.latitude,
            longitude: userLocation.src.longitude,
        },
        {
            latitude: userLocation.src.latitude + 1,
            longitude: userLocation.src.longitude + 1,
        }
    ]

    const fetchNearParking = async (result) => {
        if (!showParking) {
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min`);

        const calTimeStamp = add_minutes(new Date(), result.duration);
        console.log("cal timestamp: ", calTimeStamp);

        const data = {
            latitude: userLocation.des.latitude,
            longitude: userLocation.des.longitude,
            generalLoc: userLocation.des.generalLoc,
            timeStamp: calTimeStamp
        }
            if(request ==="FIND"){
                findParking(data);
            }
            else if (request==="SHARE"){
                props.setCarDetails(data); 
                console.log("col col col");
            }
    }
    }

    const stopPropagation = thunk => e => {
        e.stopPropagation();
        thunk();
    }

    const findParking = async (data) => {
        try {
            await hannaServer.post('/find-parks', data)
            .then(res => {
                if (res.status === 200) {
                    console.log("check")
                    const specific_parking = res.data.nearbyParking[0].specificLocation;
                    // console.log(specific_parking);
                    // console.log(specific_parking.latitude)
                    const json = JSON.parse(specific_parking);
                    console.log("json: ", json.latitude)
                    
                    setNearbyParking(res.data.nearbyParking);
                }
            })
            
        } catch(e) {
            console.log("error loading near parks")
        }
    } 

    const handleMarkerPress = () => {
        console.log("Marker Pressed");
        setCarDetailsModal(true);
    }
    // const shareParking = (data) => {
    //     try {
    //         let userToken = await AsyncStorage.getItem('userToken');
    //         await hannaServer.post('/share-parks', data)
    //         .then(res => {
    //             if (res.status === 200) {
    //                 console.log("check")
    //                 const specific_parking = res.data.nearbyParking[0].specificLocation;
    //                 // console.log(specific_parking);
    //                 // console.log(specific_parking.latitude)
    //                 const json = JSON.parse(specific_parking);
    //                 console.log("json: ", json.latitude)
                    
    //                 setNearbyParking(res.data.nearbyParking);
    //             }
    //         })
            
    //     } catch(e) {
    //         console.log("error loading near parks")
    //     }
    // } 
    useEffect(() => {
        console.log("array len: ", nearbyParking.length);
        if (nearbyParking.length > 0 && !showParking) {
            console.log("change show parking")
            setShowParking(true);
        }
    },[nearbyParking.length])
    
    return (
        <>
            <MapView
                style = {{width, height}}
                loadingEnabled = {true}
                region = {{
                latitude: userLocation.src.latitude,
                longitude: userLocation.src.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
                }}
            >  
              <Marker
                    ref={markerRef}
                    title = "source"
                    coordinate= {coordinates[0]} 
                    
                >
                    <Image 
                        source={imagePath.icCurLoc}
                        style = {styles.icCar}
                    />
                </Marker>

                {showParking && nearbyParking.length > 0 && nearbyParking.map((parking, index) => {
                    const { latitude, longitude} = JSON.parse(parking.specificLocation)
                    
                    return (
                        <Marker
                            key={index}
                            coordinate = {{latitude: latitude, longitude: longitude}}
                            onPress={(e) =>{e.stopPropagation(); handleMarkerPress(index)}}
                            title={"title title"}
                        >
                         <Image 
                            source={imagePath.icCurLoc}
                            style = {[styles.icCar, {backgroundColor: 'red'}]}
                        />   
                        </Marker>
                    )
                })}
            {userLocation.des.latitude && (
                <Marker coordinate = {{latitude: userLocation.des.latitude, longitude: userLocation.des.longitude}} title = "des" />   
            )}
            {userLocation.des.latitude && (
                <MapViewDirections 
                origin={userLocation.src}
                destination={userLocation.des}
                apikey={GOOGLE_API_KEY}
                strokeWidth = {3}
                strokeColor = "hotpink"
                onReady={(result) => fetchNearParking(result)}
                
                />   
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
    },
})