import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, useWindowDimensions, ImageBackground,} from "react-native";
import hannaServer from "../api/hannaServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { add_minutes,diff_minutes, showSuccess } from "../constants/helpers/helperFunctions";
import FindDestination from "../components/FindDestination";
import NumericInput from "react-native-numeric-input";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import Map from '../components/Map';
import { useDispatch, useSelector } from "react-redux";
import { changeParkingAvailable, selectTransaction } from "../features/transaction/transactionSlice";
import { selectLocation } from "../features/location/locationSlice";

const ShareParkingScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {isParkingAvail} = useSelector(selectTransaction)
  const myLocation = useSelector(selectLocation);
    
  const { width, height } = useWindowDimensions();
  const [carDetails,setCarDetails] = useState();
  const [expectedDepratureTime,setExpectedDepratureTime]=useState();
  const [diffMins,setDiffMins]=useState();


//   const imageSrc = require('../assets/house-blue-bg.jpeg');

  const handleShareBtn = async () => {
    console.log("shared parking",carDetails)    

    try{
      let userToken = await AsyncStorage.getItem('userToken');
      let userTokenJson = JSON.parse(userToken);

      let carDetail = await AsyncStorage.getItem('carDetails');
      let carDetailJson = JSON.parse(carDetail);
      let carNumber = carDetailJson[0].registrationNumber;

      let durationArrivedTime = add_minutes(carDetails.timeStamp,expectedDepratureTime); 
      setDiffMins(diff_minutes(durationArrivedTime,new Date()));
      const userParking = {
        userToken: userTokenJson.refreshToken,
        specificLocation: 
        { latitude: carDetails.latitude,
          longitude: carDetails.longitude
        },
          genralLocation: carDetails.generalLoc,
          timeStamp: carDetails.timeStamp,
          registrationNumber: carNumber,
          myLoc: myLocation.src,
       }
       hannaServer.post('/share-parks', userParking )
       .then(res => {
         console.log(res.data)
         dispatch(changeParkingAvailable(true))
         const userParkingId = res.data.userParkingId;
         console.log("userParkingId-SHARE", userParkingId)
         navigation.goBack('Home', {userId: userParkingId})
         showSuccess("Thanks for sharing")
        })
      //  .then(() => useDispatch(changeParkingAvailable(true)))
      //  .then(() => navigation.navigate('Home'))
      //   .then(() => showSuccess("Thanks for sharing"))
        .catch((e) => console.log("failed connect share parking",e.response))
      }
       catch(e){
         console.log("failed connect share parking",e)
        }
    
  }

  return (
    <View style={styles.SharingContainer}>
        <View style={styles.findDes}>
          <FindDestination placeholderText={"Where is your car at?"} handleSearch={() => console.log('stay in the same page')}  />
        {/* </View>
        <View style={styles.map}> */}
            <Map width={width} height={height /1.5} request={"SHARE"} setCarDetails={setCarDetails} isParking={false} />
        </View>
        <View style={styles.SharedParkingDetails}>
            <Text style={{fontSize:15, fontWeight: 'bold'}}>Expected Deprature Time:</Text>
            <NumericInput minValue={0} onChange={setExpectedDepratureTime}/>
            <Text style={{fontSize:15, fontWeight: 'bold', alignItems: 'center'}}>Expected Arrived Time: {"\n"} {diffMins}</Text>
        </View>
        <View style={styles.SharedParkingDetails}>
            <MyButton title={"Share"} onPress={handleShareBtn} />
        </View>
        {/* </ImageBackground> */}
    </View>
  );
};

export default ShareParkingScreen;

const styles = StyleSheet.create({
  SharingContainer: {
    flex: 1,
    display: 'flex',
    // backgroundColor: "white"
    justifyContent: 'space-between'
  },
  SharedParkingDetails: {
    justifyContent: 'space-evenly',
    flex: 0.5,
    alignItems: 'center',

  },
  findDes: {
    flex: 2
  },
  map: {
    flex: 2,
  }
});