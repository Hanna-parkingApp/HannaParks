import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
} from 'react-native';
import Map from '../components/Map'
import { useSharedValue } from 'react-native-reanimated';
import GeoBar from '../components/GeoBar';
import BottomSheet from '../components/BottomSheetView';
import Header from '../components/Header';
import * as Location from 'expo-location';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { useSelector } from 'react-redux';
import { selectLocation } from '../features/location/locationSlice';
import { useDispatch } from 'react-redux';
import { changeSrcState } from '../features/location/locationSlice';


export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [permissionStatus, setPermissionStatus] = useState('');
  const [endPoint, setEndPoint] = useState('');

  const dispatch = useDispatch();
  const userLocation = useSelector(selectLocation);

  
  const callShowDirections = () => {
    const startPoint = {
      // longitude: location.coords.longitude,
      // latitude: location.coords.latitude
    }
  };

  const handleSearch = (dest) => {
    console.log(dest);
    setEndPoint(dest);
  }

  useEffect(() => {
    getLocation();
  },[])
  
  // useEffect(() => {
  //   if (userLocation.des.latitude !== 0) {
  //   const interval = setInterval(() => {
  //     console.log(userLocation.des);
  //     getLocation();
  //   }, 6 * 1000);
  //   return () => clearInterval(interval)
  
  // } else {
  //   console.log("not interval")
  //   getLocation();
  // }
  // }, [])


  const getLocation = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
        console.log("status not granted")
        setPermissionStatus('PERMISSION NOT GRANTED!');
        //alert(permissionStatus);
    }

    const location = await Location.getCurrentPositionAsync({});
    // setLocation(userLocation);
    dispatch(changeSrcState(location));
}

  const y = useSharedValue(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />

      {userLocation.src? (
        <Map width={width} height={height} myLocation={userLocation.src} desLocation = {userLocation.des}/>
      ): (
        <Text>Loading Page ...</Text>
      )}
      

      <GeoBar panY={y} />

      <BottomSheet panY={y} handleSearch = {handleSearch} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});