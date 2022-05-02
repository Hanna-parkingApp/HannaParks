import React, { useState } from "react";
import {StyleSheet, Text, View, useWindowDimensions, ImageBackground,} from "react-native";
import hannaServer from "../api/hannaServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { add_minutes,diff_minutes } from "../constants/helpers/helperFunctions";
import FindDestination from "../components/FindDestination";
import NumericInput from "react-native-numeric-input";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import Map from '../components/Map';


const ShareParkingScreen = () => {

  const navigation = useNavigation();
    
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
      console.log("usertokenjson: ", userTokenJson);

      let durationArrivedTime = add_minutes(carDetails.timeStamp,expectedDepratureTime); 
      setDiffMins(diff_minutes(durationArrivedTime,new Date()));
      const userParking = {
        userToken: userTokenJson.refreshToken,
        specificLocation: 
        { latitude: carDetails.latitude,
          longitude: carDetails.longitude
        },
          genralLocation: carDetails.generalLoc,
          timeStamp: carDetails.timeStamp 
       }
       hannaServer.post('/share-parks', userParking ).then(
         res => console.log("############",res.data)
       ).then(() => navigation.navigate('Home'));
      }
      
       catch(e){
         console.log("failed connect share parking",e)
        }
    
  }

  return (
    <View style={styles.SharingContainer}>
        {/* <ImageBackground source={imageSrc} resizeMode="cover" style={{flex: 1, justifyContent: 'center'}}> */}
        <FindDestination placeholderText={"Where is your car at?"} handleSearch={() => console.log('stay in the same page')}  />
            <Map width={width} height={height /2} request={"SHARE"} setCarDetails={setCarDetails} />
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
});