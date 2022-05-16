import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import MapView, { Callout } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GoogleMapKey as GOOGLE_API_KEY } from '../constants/google-map-api/googleMapKey';
import imagePath from '../constants/imagePath';
import hannaServer from "../api/hannaServer";
import { useDispatch, useSelector } from 'react-redux';
import { selectLocation } from '../features/location/locationSlice';
import { add_minutes } from '../constants/helpers/helperFunctions';
import { changeCarDetailState } from '../features/car-detail/carDetailSlice';

const Map = (props) => {

    const dispatch = useDispatch();
    
    const {width, height,request, setCarDetailsModal} = props;
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.04;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const [nearbyParking, setNearbyParking] = useState([]);
    const [showParking, setShowParking] = useState(false);

    const [dirOrigin, setDirOrigin] = useState(null);

    const userLocation = useSelector(selectLocation);
    
    const markerRef = useRef();    
    const mapRef = useRef();

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

    console.log("**********");
    console.log("coords: ", coordinates[0])

    const initialRegion = {
        latitude: dirOrigin?.latitude || userLocation.src.latitude,
        longitude: dirOrigin?.longitude || userLocation.src.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }

    const fetchNearParking = async (result) => {
        if (!showParking) {
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min`);
        console.log("fit to coords: ", result.coordinates[0]);

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
                    console.log("near by parking: ",res.data.nearbyParking);
                    setNearbyParking(res.data.nearbyParking);
                }
            })
            
        } catch(e) {
            console.log("error loading near parks")
        }
    } 

    const handleMarkerPress = (index) => {
        console.log("Marker Pressed");
        try {
            //const json = JSON.parse(nearbyParking[index]);
            console.log(nearbyParking[index]);
            const { _id, generalLocation, specificLocation, timeStamp, userId } = nearbyParking[index];
            const { latitude, longitude} = JSON.parse(nearbyParking[index].specificLocation);
            const carDetail = {
                id: _id,
                userId: userId,
                generalLoc: generalLocation,
                specificLoc: {
                    latitude,
                    longitude
                },
                timeStamp,
                car: null
            }
            console.log("line 101, genloc: ", carDetail.generalLoc);
            dispatch(changeCarDetailState(carDetail));
            setCarDetailsModal(true);
        } catch (e) {
            console.log("Error in handle Marker Press. ", e);
        }
        
    }

    useEffect(() => {
        console.log("use effect")
        setDirOrigin(userLocation.src);
    },[])

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
                ref={mapRef}
                style = {{width, height}}
                loadingEnabled = {true}
                initialRegion = {{
                ...userLocation.src,
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

                {showParking && nearbyParking.length > 0 && nearbyParking.map((parking, index) => {
                    const { latitude, longitude} = JSON.parse(parking.specificLocation)
                    
                    return (
                        <Marker.Animated
                            key={index}
                            coordinate = {{latitude: latitude, longitude: longitude}}
                            onPress={(e) =>{e.stopPropagation(); handleMarkerPress(index)}}
                            title={"title title"}
                        >
                         <Image 
                            source={imagePath.icCurLoc}
                            style = {[styles.icCar, {backgroundColor: 'red'}]}
                        />   
                        </Marker.Animated>
                    )
                })}
            {userLocation.des.latitude && (
                <Marker.Animated coordinate = {{latitude: userLocation.des.latitude, longitude: userLocation.des.longitude}} title = "des" />   
            )}
            {userLocation.des.latitude && (
                <MapViewDirections 
                origin={dirOrigin}
                destination={userLocation.des}
                apikey={GOOGLE_API_KEY}
                strokeWidth = {3}
                strokeColor = "hotpink"
                mode={request === "SHARE" ? "WALKING" : "DRIVING"}
                onReady={(result) => {fetchNearParking(result); mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                        // right: 30,
                        // bottom: 300,
                        // left: 30,
                        // top: 100,
                    },
                });}}
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