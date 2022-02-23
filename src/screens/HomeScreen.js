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
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import GeoBar from '../components/GeoBar';
import BottomSheet from '../components/BottomSheetView';
import Header from '../components/Header';
import * as Location from 'expo-location';
import { OpenMapDirections } from 'react-native-navigation-directions';


export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const [ location, setLocation ] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('');
  const [endPoint, setEndPoint] = useState('');
  
  const callShowDirections = () => {
    const startPoint = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    }
    
  };
  

  useEffect(() => {
    getLocation();
  }, [])  


  const getLocation = async () => {
    console.log("location")
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
        console.log("status not granted")
        setPermissionStatus('PERMISSION NOT GRANTED!');
        //alert(permissionStatus);
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    console.log(userLocation);
    setLocation(userLocation);
}

  const y = useSharedValue(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />

      {location? (
        <Map width={width} height={height} location={location}/>
      ): (
        <Text>Loading Page ...</Text>
      )}
      

      <GeoBar panY={y} />

      <BottomSheet panY={y} SetEndPoint = {setEndPoint} />

      {/* <SafeAreaView
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <View style={styles.container}>
          <SearchBar panY={y} />
          <NavBar panY={y} />
        </View>
      </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});