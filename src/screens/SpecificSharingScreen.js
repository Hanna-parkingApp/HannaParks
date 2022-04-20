import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import HannaText from "../components/HannaText";
import Map from "../components/Map";
import FormDetail from "../components/FormDetail";
import { useSelector } from "react-redux";
import { selectLocation } from "../features/location/locationSlice";
import BottomSheet from '../components/BottomSheetShareView';
import GeoBar from '../components/GeoBar';
import { useSharedValue } from 'react-native-reanimated';


const SpecificSharingScreen = () => {
  const { width, height } = useWindowDimensions();
  // const [street, setStreet] = useState("Rambam 7");
  // const [city, setCity] = useState("Tel Aviv");

  const handleSearch = (dest) => {
    console.log(dest);
    setEndPoint(dest);
  }
  const userLocation = useSelector(selectLocation);
  const y = useSharedValue(0);

  return (
    <View>
      <HannaText />
      <View style={styles.SharingContainer}>
        <SafeAreaView>
          <Map width={width} height={height / 2}  myLocation={userLocation.src} desLocation = {userLocation.des}  />
        </SafeAreaView>
      </View>
      <GeoBar panY={y} />

    <BottomSheet panY={y} handleSearch = {handleSearch} />
      <View style={styles.SharedParkingDetails}>
        {/* <Text>Parking Location</Text>
        <FormDetail
          style={styles.formDetailStyle}
          labelValue={street}
          placeholderText={"njnj"}
          detailName={"Street"}
        ></FormDetail>
        <FormDetail
          style={styles.formDetailStyle}
          labelValue={city}
          placeholderText={"mkkmk"}
          detailName={"City"}
        ></FormDetail>
        <TouchableOpacity
          style={styles.btnConfirmContainer}
          onPress={console.log("confirm parking location")}
        > */}


          {/* <Text style={styles.btnConfirmText}>Confirm</Text>
        </TouchableOpacity> */}

        <View style={styles.calculateTimeContainer}>
          <View style={styles.deperatureTimeContainer}>
            <Text>Expected Deprature Time: </Text>
            <TextInput
            style={styles.deperatureTimeInput}
              value="7m"
              numberOfLines={1}
              placeholderTextColor="#666"
            />
          </View>
          <Text>Expected Arrived Time : 10m</Text>
        </View>
        <TouchableOpacity
          onPress={console.log("shared parking")}
          style={styles.btnShareContainer}
        >
          <Text style={styles.btnShareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpecificSharingScreen;

const styles = StyleSheet.create({
  SharingContainer: {

  },
  SharedParkingDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ffff",
    borderStyle: "solid",
    backgroundColor: "white",
    width: "100%",
  },
  formDetailStyle: {
    height: 40,
    width: "90%",
    marginBottom: 1,
  },
  btnShareContainer: {
    backgroundColor: "#1e90ff",
    marginBottom: 8,
    width: "90%",
    marginTop: 10,
    padding: 10,
    borderRadius: 3,
  },
  btnShareText: {
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  btnConfirmContainer: {
    backgroundColor: "#3CB371",
    marginBottom: 8,
    width: "90%",
    marginTop: 10,
    padding: 10,
    borderRadius: 3,
  },
  btnConfirmText: {
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  calculateTimeContainer: {
    display: "flex",
  },
  deperatureTimeContainer: {
      display:'flex', 
      flexDirection:'row',
      alignItems: 'center',
      marginBottom: 5,
  },
  deperatureTimeInput: {
      borderWidth:2,
      borderColor: '#000',
      padding: 4,
  }
});
