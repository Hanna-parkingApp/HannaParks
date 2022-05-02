import React, { useState, useEffect } from 'react';
import {
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
import MyButton from '../components/MyButton';
import CarDetailsModal from '../components/CarDetailsModal';


export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [permissionStatus, setPermissionStatus] = useState('');
  const [endPoint, setEndPoint] = useState('');

  const [carDetailsModal, setCarDetailsModal] = useState(false);

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
    if(!userLocation.src.latitude)
      getLocation();
    else 
      console.log(userLocation.src.latitude)
  },[userLocation.src.latitude])
  
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

      <MyButton title={"Share parking"}  onPress={() => navigation.navigate('Share-Parking')}/>
      
      {carDetailsModal && (
        <CarDetailsModal modalVisible={carDetailsModal} setModalVisible={setCarDetailsModal} />
      )}

      {userLocation.src.latitude? (
        <Map width={width} height={height} request={"FIND"} setCarDetailsModal={setCarDetailsModal}/>
      ): (
        <Text>Loading Page ...</Text>
      )}
      
      <BottomSheet panY={y} handleSearch = {handleSearch} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});