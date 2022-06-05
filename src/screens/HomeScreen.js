import React, { useState, useEffect, useRef } from 'react';
import {
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
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
import { changeOtherUserLoc, selectTransaction } from '../features/transaction/transactionSlice';
import hannaServer from '../api/hannaServer';
import { useNavigation } from '@react-navigation/native';
import { selectCarDetail } from '../features/car-detail/carDetailSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistance } from 'geolib';
import IsArrivedModal from '../constants/alerts/IsArrivedModal';
import { changeMode, selectRoleMode } from '../features/mode/roleModeSlice';
import { showSuccessHandShake } from '../constants/helpers/helperFunctions';


export default function HomeScreen({route}) {

  const USER_MODE = useSelector(selectRoleMode);
  console.log("USER_MODE: ", USER_MODE);

  const initialState = {
    myLoc: null,
    parkingLoc: null
  }

  const { width, height } = useWindowDimensions();
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [endPoint, setEndPoint] = useState('');

  const [carDetailsModal, setCarDetailsModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userLocation = useSelector(selectLocation);
  const [userParkingId, setUserParkingId] = useState();
  
  const {isParkingAvail} = useSelector(selectTransaction);
  const carDetails = useSelector(selectCarDetail);
  const transactionDetails = useSelector(selectTransaction);

  const [isAvail, setIsAvail] = useState(isParkingAvail);
  
  const [askForLocation, setAskForLocation] = useState(false);

  const [isParking, setIsParking] = useState(false);

  const [isArrivedModal, setIsArrivedModal] = useState(false);

  const handleSearch = (dest) => {
    showMessage("hello")
    setEndPoint(dest);
  }

  //  Location Settings
  // {
  useEffect(() => {
    if (!permissionStatus)
      askForPermissions();
  }, [])

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

  useEffect(() => {
    if (permissionStatus) {
      const interval = setInterval(() => getLocation(), 6 * 1000);
      return () => clearInterval(interval)
    } 
    
  }, [permissionStatus])

  const getLocation = async () => {
    console.log('get location');
    const location = await Location.getCurrentPositionAsync({});
    dispatch(changeSrcState(location));
}
// }

  //  SEARCHER CONTROLLER
  // {
  useEffect(() => {
    console.log("is parking!!!", isParking);
    if(isParking && (USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER")) {
      updateParkingStatus();
      dispatch(changeDesState(carDetails.specificLoc))
      setAskForLocation(true)
    }
  },[isParking])

  const updateParkingStatus = async () => {
    hannaServer.post('/update-parking-status', { userParkingId: carDetails.id})
    .catch(e => console.log("Error updating parking status. ", e.response))
  }


  // }

  //  SHARE CONTROLL
  // {

  const [showSearchLoading, setShowSearchLoading] = useState(true);

  useEffect(() => {
    if(route.params?.userId) {
      setUserParkingId(route.params.userId);
    }
  },[route.params?.userId])

useEffect(() => {
  // if (isParkingAvail && isAvail && userParkingId) {
    console.log("User mode.state: ", USER_MODE)
    console.log(userParkingId);
    let interval;
    if (USER_MODE.state === 'SHARE' && userParkingId) {
      interval = setInterval(() => {
      console.log("check if parking is available ");
      hannaServer.post('/parking-status', { userParkingId })
      .then(res => {
        console.log("res.data.isAvail", res.data.isAvail);
        if (!res.data.isAvail) {
          console.log("clearing interval");
          setIsAvail(false);
          clearInterval(interval)
        }
        //setIsAvail(res.data.isAvail);
      })
      .catch(e => console.log("error getting parking status from server, ", e.response))

    }, 6 * 1000);
  }
},[USER_MODE, userParkingId])
// },[isParkingAvail, userParkingId])

useEffect(() => {
  if(!isAvail && USER_MODE.state === 'SHARE') {
    showSuccessHandShake("Someone is on his way to your parking lot!")
    setShowSearchLoading(false);
  }
}, [isAvail])

useEffect(() => {
  let interval;
  if (askForLocation) {
    console.log("asking for opponent location")
    let userTokenJson;
    interval = setInterval(async () => {
      try {
        let userToken = await AsyncStorage.getItem('userToken');
        userTokenJson = JSON.parse(userToken);
      
    } catch (e) {
        console.log("Error getting user token from local storage");
      }

      hannaServer.post('/navigation-updater', {
        userId: carDetails.userId,
        userToken: userTokenJson.refreshToken,
        userType: USER_MODE.state || USER_MODE,
        myLoc: userLocation.src
      })
      .then(res => {
        const json = (USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER") ? res.data.updatedObj.shareCurLoc : res.data.updatedObj.searcherCurLoc;
        const otherCurLoc = JSON.parse(json);
        console.log('other cur loc:', otherCurLoc);
        console.log("home screen user location #src: ", userLocation.src);
        console.log("home screen user location #des: ", userLocation.des);

        
        const distance = getDistance(userLocation.src, userLocation.des);
        if (distance < 1000) {
          setIsArrivedModal(true);
          return clearInterval(interval);
        }
        dispatch(changeOtherUserLoc(otherCurLoc));
      })
      .catch(e => console.log("error calling navigation updater ",e))
    }, 6 * 1000);
  }
},[askForLocation])



  const y = useSharedValue(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />

      {(USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER") && (
        <MyButton title={"Share parking"}  onPress={() => {
          dispatch(changeMode("SHARE"));
          navigation.navigate('Share-Parking')}}
        />
      )} 
      {USER_MODE === "SHARE" || USER_MODE.state === "SHARE" && showSearchLoading && (
        <View style = {styles.searchMatchLoaderContainer}>
          <Text style={styles.waitingSearchText}>Waiting for parking match ...</Text>
          <ActivityIndicator color={"white"} style={{marginRight: 10}}/>
        </View>
      )}
      
      
      {carDetailsModal && (
        <CarDetailsModal modalVisible={carDetailsModal} setModalVisible={setCarDetailsModal} setIsParking={setIsParking} />
      )}

      {userLocation.src.latitude? ( 
        <Map width={width} height={height} request={"FIND"} setCarDetailsModal={setCarDetailsModal} isParking={isParking}/>
      ): (
        <Text>Loading Page ...</Text>
      )}

      <IsArrivedModal 
      modalVisible={isArrivedModal} 
      setModalVisible={setIsArrivedModal} 
      setIsParking={setIsParking}
      setAskForLocation={setAskForLocation}
      />
      
      {(USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER") && (
        <BottomSheet panY={y} handleSearch = {handleSearch} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchMatchLoaderContainer: {
    backgroundColor: '#48D1CC',
    //backgroundColor: 'black',
    //elevation: 13,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  waitingSearchText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white', 
    lineHeight: 21, 
    marginHorizontal: 5,
  }
});