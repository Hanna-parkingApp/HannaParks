import React, { useState, useEffect, useRef } from 'react';
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
import { changeDesState, selectLocation } from '../features/location/locationSlice';
import { useDispatch } from 'react-redux';
import { changeSrcState } from '../features/location/locationSlice';
import MyButton from '../components/MyButton';
import CarDetailsModal from '../components/CarDetailsModal';
import { showMessage } from 'react-native-flash-message';
import { selectTransaction } from '../features/transaction/transactionSlice';
import hannaServer from '../api/hannaServer';
import { useNavigation } from '@react-navigation/native';
import { selectCarDetail } from '../features/car-detail/carDetailSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({route}) {
  const { width, height } = useWindowDimensions();
  const [permissionStatus, setPermissionStatus] = useState('');
  const [endPoint, setEndPoint] = useState('');

  const [carDetailsModal, setCarDetailsModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userLocation = useSelector(selectLocation);
  const [userParkingId, setUserParkingId] = useState();
  
  const {isParkingAvail} = useSelector(selectTransaction);
  const carDetails = useSelector(selectCarDetail);

  const [isAvail, setIsAvail] = useState(isParkingAvail);
  
  const [askForLocation, setAskForLocation] = useState(false);

  const [isParking, setIsParking] = useState(false);

  const handleSearch = (dest) => {
    showMessage("hello")
    setEndPoint(dest);
  }

  useEffect(() => {
    if(route.params?.userId) {
      console.log("here");
      setUserParkingId(route.params.userId);
    }
  },[route.params?.userId])

  useEffect(() => {
    if (permissionStatus !== '')
      askForPermissions();
  }, [])
  
  useEffect(() => { 
    console.log("route params: ", route.params);
   // getLocation()
    console.log(permissionStatus);
    const interval = setInterval(() => getLocation(), 6 * 1000);
    return () => clearInterval(interval)
  }, [permissionStatus])

  const askForPermissions = async () => {
    console.log("ask for permissions...");
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log("status not granted")
        setPermissionStatus('PERMISSION NOT GRANTED!');
        //alert(permissionStatus);
    }
    setPermissionStatus(status);
  }

  const getLocation = async () => {
    console.log('get location');
    const location = await Location.getCurrentPositionAsync({});
    dispatch(changeSrcState(location));
}

// const checkParkingStatus = async () => {
//   console.log("check if parking is available ");
  
//     hannaServer.post('/parking-status', { userParkingId })
//     .then(res => {
//       console.log(res.data.isAvail)
//       setIsAvail(res.data.isAvail);
//     })
//     .catch(e => console.log("error getting parking status from server, ", e.response))
  
// }

useEffect(() => {
  console.log("user parking id: ", userParkingId);
  console.log("is avail: ", isAvail);
  if (isParkingAvail && isAvail && userParkingId) {
    let interval = setInterval(() => {
      console.log("check if parking is available ");
      hannaServer.post('/parking-status', { userParkingId })
      .then(res => {
        console.log(res.data.isAvail)
        if (!res.data.isAvail) {
          console.log("clearing interval");
          clearInterval(interval)
        }
        //setIsAvail(res.data.isAvail);
      })
      .catch(e => console.log("error getting parking status from server, ", e.response))

    }, 6 * 1000);
  }

},[isParkingAvail, userParkingId])

useEffect(() => {
  if (askForLocation) {
    console.log("asking for opponent location")
    let interval = setInterval(async () => {
      let userToken = await AsyncStorage.getItem('userToken');
      let userTokenJson = JSON.parse(userToken);

      hannaServer.post('/navigation-updater', {
        userId: carDetails.userId,
        userToken: userTokenJson.refreshToken,
        userType: "FIND",
        myLoc: userLocation.src
      })
      .then((res) => console.log(res.data))
    }, 6 * 1000);
  }
},[askForLocation])

useEffect(() => {
  if(isParking) {
    dispatch(changeDesState(carDetails.specificLoc))
    setAskForLocation(true)
  }
},[isParking])

  const y = useSharedValue(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />

      <MyButton title={"Share parking"}  onPress={() => navigation.navigate('Share-Parking')}/>
      
      {carDetailsModal && (
        <CarDetailsModal modalVisible={carDetailsModal} setModalVisible={setCarDetailsModal} setIsParking={setIsParking} />
      )}

      {userLocation.src.latitude? (
        <Map width={width} height={height} request={"FIND"} setCarDetailsModal={setCarDetailsModal} isParking={isParking}/>
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