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
import BottomSheet from "../components/BottomSheetShareView";
import GeoBar from "../components/GeoBar";
import { useSharedValue } from "react-native-reanimated";
import hannaServer from "../api/hannaServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  add_minutes,
  diff_minutes,
} from "../constants/helpers/helperFunctions";

const SpecificSharingScreen = () => {
  const { width, height } = useWindowDimensions();
  const [carDetails, setCarDetails] = useState();
  const [expectedDepratureTime, setExpectedDepratureTime] = useState();
  const [diffMins, setDiffMins] = useState();

  const handleSearch = (dest) => {
    console.log(dest);
    setEndPoint(dest);
  };

  const getLocation = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      console.log("status not granted");
      setPermissionStatus("PERMISSION NOT GRANTED!");
      //alert(permissionStatus);
    }

    const location = await Location.getCurrentPositionAsync({});
    // setLocation(userLocation);
    dispatch(changeSrcState(location));
  };

  const userLocation = useSelector(selectLocation);
  const y = useSharedValue(0);

  return (
    <View>
      <HannaText />
      <View style={styles.SharingContainer}>
        <SafeAreaView></SafeAreaView>
      </View>

      {userLocation.src ? (
        <Map
          width={width}
          height={height / 2}
          request={"SHARE"}
          setCarDetails={setCarDetails}
        />
      ) : (
        <Text>Loading Page ...</Text>
      )}

      <GeoBar panY={y} />

      <BottomSheet panY={y} handleSearch={handleSearch} />
      <View style={styles.SharedParkingDetails}>
        <View style={styles.calculateTimeContainer}>
          <View style={styles.deperatureTimeContainer}>
            <Text>Expected Departure Time: </Text>
            <TextInput
              style={styles.deperatureTimeInput}
              value={expectedDepratureTime}
              numberOfLines={1}
              placeholderTextColor="#666"
              onChangeText={setExpectedDepratureTime}
            />
          </View>
          <Text>Expected Arrived Time: {diffMins}</Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            console.log("shared parking", carDetails);

            try {
              let userToken = await AsyncStorage.getItem("userToken");
              let userTokenJson = JSON.parse(userToken);
              // console.log(userToken);
              // console.log("carDetails.timeStamp",carDetails.timeStamp);
              // console.log("expectedDepratureTime",expectedDepratureTime);

              let durationArrivedTime = add_minutes(
                carDetails.timeStamp,
                expectedDepratureTime
              );
              // console.log("durationArrivedTime",durationArrivedTime);
              setDiffMins(diff_minutes(durationArrivedTime, new Date()));
              // console.log(userTokenJson.refreshToken);
              const userParking = {
                userToken: userTokenJson.refreshToken,
                specificLocation: {
                  latitude: carDetails.latitude,
                  longitude: carDetails.longitude,
                },
                generalLocation: carDetails.generalLoc,
                timeStamp: carDetails.timeStamp,
              };
              hannaServer
                .post("/share-parks", userParking)
                .then((res) => console.log("############", res.data));
            } catch (e) {
              console.log("failed connect share parking", e);
            }
          }}
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
  SharingContainer: {},
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
    backgroundColor: "#48D1CC",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  deperatureTimeInput: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 4,
  },
});
