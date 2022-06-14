import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { ActivityIndicator } from "react-native";
import Map from "../components/Map";
import { useSharedValue } from "react-native-reanimated";
import GeoBar from "../components/GeoBar";
import BottomSheet from "../components/BottomSheetView";
import Header from "../components/Header";
import * as Location from "expo-location";
import { OpenMapDirections } from "react-native-navigation-directions";
import { useSelector } from "react-redux";
import {
  changeDesState,
  selectLocation,
} from "../features/location/locationSlice";
import { useDispatch } from "react-redux";
import { changeSrcState } from "../features/location/locationSlice";
import MyButton from "../components/MyButton";
import CarDetailsModal from "../components/CarDetailsModal";
import { showMessage } from "react-native-flash-message";
import {
  changeOtherUserLoc,
  selectTransaction,
} from "../features/transaction/transactionSlice";
import hannaServer from "../api/hannaServer";
import { useNavigation } from "@react-navigation/native";
import { selectCarDetail } from "../features/car-detail/carDetailSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance } from "geolib";
import IsArrivedModal from "../constants/alerts/IsArrivedModal";
import LoadingScreen from "./LoadingScreen";
import { changeMode, selectRoleMode } from "../features/mode/roleModeSlice";
import { showSuccessHandShake } from "../constants/helpers/helperFunctions";
import { selectUserDetails } from "../features/profile/userDetailsSlice";

const SEARCH_COST = -1;

export default function HomeScreen({ route, navigation }) {
  const USER_MODE = useSelector(selectRoleMode);
  console.log("USER_MODE: ", USER_MODE);

  const { width, height } = useWindowDimensions();
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [endPoint, setEndPoint] = useState("");

  const userDetails = useSelector(selectUserDetails);

  const [carDetailsModal, setCarDetailsModal] = useState(false);

  const dispatch = useDispatch();
  //const navigation = useNavigation();
  const userLocation = useSelector(selectLocation);
  const [userParkingId, setUserParkingId] = useState();

  const { isParkingAvail } = useSelector(selectTransaction);
  const carDetails = useSelector(selectCarDetail);
  const transactionDetails = useSelector(selectTransaction);

  const [isAvail, setIsAvail] = useState(isParkingAvail);

  const [askForLocation, setAskForLocation] = useState(false);

  const [isParking, setIsParking] = useState(false);

  const [isArrivedModal, setIsArrivedModal] = useState(false);

  const handleSearch = (dest) => {
    showMessage("hello");
    setEndPoint(dest);
  };

  //  Location Settings
  useEffect(() => {
    if (!permissionStatus) askForPermissions();
  }, []);

  const askForPermissions = async () => {
    console.log("ask for permissions...");
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("status not granted");
      setPermissionStatus("PERMISSION NOT GRANTED!");
      //alert(permissionStatus);
    }
    setPermissionStatus(status);
  };

  useEffect(() => {
    if (permissionStatus) {
      const interval = setInterval(() => getLocation(), 6 * 1000);
      return () => clearInterval(interval);
    }
  }, [permissionStatus]);

  const getLocation = async () => {
    console.log("get location");
    const location = await Location.getCurrentPositionAsync({});
    dispatch(changeSrcState(location));
  };

  //  SEARCHER CONTROLLER
  useEffect(() => {
    console.log("is parking!!!", isParking);
    if (
      isParking &&
      (USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER")
    ) {
      updateParkingStatus();
      updatePoints(SEARCH_COST);
      dispatch(changeDesState(carDetails.specificLoc));
      setAskForLocation(true);
    }
  }, [isParking]);

  const updateParkingStatus = async () => {
    hannaServer
      .post("/update-parking-status", { userParkingId: carDetails.id })
      .catch((e) => console.log("Error updating parking status. ", e.response));
  };

  const updatePoints = async (points) => {
    console.log("lost points");
    let token_json;
    try{
      const token = await AsyncStorage.getItem('userToken');
      token_json = JSON.parse(token);
    } catch (e) {
      console.log('error getting user token for points');
    }
    hannaServer.post('/update-user-points', {
      token: token_json.refreshToken,
      pointsModifier: points
    })
    .then(res => {
      console.log(res);
    })
    .catch(e => console.log("Error points update"))
  }

  //  TODO: Maybe modal for that message
  const onPressLocBtn = () => {
    if (userDetails.points < 1) {
      Alert.alert("Can't search for new parking due lack of points\n Cheer up! Go and get more points by share parking spot of your own");
      return false;
    }
    return true;
  }

  const stopSearching = () => {
    dispatch(changeDesState(null));
    setShowBottomSheet(true);
  }

  //  SHARE CONTROLL
  const [showSearchLoading, setShowSearchLoading] = useState(true);

  useEffect(() => {
    if (USER_MODE === 'SHARE' || USER_MODE.state === 'SHARE') {
      setShowBottomSheet(false);
    }
  }, [USER_MODE])

  useEffect(() => {
    if (route.params?.userId) {
      setUserParkingId(route.params.userId);
    }
  }, [route.params?.userId]);

  useEffect(() => {
    console.log("User mode.state: ", USER_MODE.state);
    console.log(userParkingId);
    let interval;
    if (USER_MODE.state === "SHARE" && userParkingId) {
      interval = setInterval(() => {
        console.log("check if parking is available ");
        hannaServer
          .post("/parking-status", { userParkingId })
          .then((res) => {
            console.log("res.data.isAvail", res.data.isAvail, userParkingId);
            console.log("User mode#############: ", USER_MODE);
            
            if (!res.data.isAvail) {
              console.log("clearing interval");
              setIsAvail(false);
              clearInterval(interval);
            }
            
            if (USER_MODE === 'SEARCHER' || USER_MODE.state === 'SEARCHER') {
              console.log("clearing interval");
              clearInterval(interval);
            }

            //dispatch(changeOtherUserLoc(shareCurLoc));
          })
          .catch((e) =>
            console.log("error calling navigation updater", e.data)
          );
      }, 6 * 1000);
    }
  }, [USER_MODE, userParkingId]);

  useEffect(() => {
    if (!isAvail && USER_MODE.state === "SHARE") {
      showSuccessHandShake("Someone is on his way to your parking lot!");
      setShowSearchLoading(false);
      setAskForLocation(true);
      setIsParking(true);
    }
  }, [isAvail]);

  const stopSharing = async () => {

    await hannaServer.put('/delete-parking', { userParkingId: userParkingId })
    .then(res => {
      console.log(res.data);
      if (res.data.isDeleted) {
        dispatch(changeMode('SEARCHER'));
        dispatch(changeDesState(null));
        setShowBottomSheet(true);
      }
    })
    .catch(e => console.log('error delete parking, ', e))
  }

  const navToShareScreen = () => {
    
    dispatch(changeMode("SHARE"));
    const des = {
      latitude: null,
      longitude: null,
      generalLoc: ''
    }
    dispatch(changeDesState(des))
    navigation.navigate("Share-Parking");
  }

  //  For Both Modes
  useEffect(() => {
    let interval;
    if (askForLocation) {
      console.log("asking for opponent location");
      let userTokenJson;
      interval = setInterval(async () => {
        try {
          let userToken = await AsyncStorage.getItem("userToken");
          userTokenJson = JSON.parse(userToken);
        } catch (e) {
          console.log("Error getting user token from local storage");
        }

        hannaServer
          .post("/navigation-updater", {
            userId: carDetails.userId,
            userToken: userTokenJson.refreshToken,
            userType: USER_MODE.state || USER_MODE,
            myLoc: userLocation.src,
          })
          .then((res) => {
            console.log("res from nav controller:");
            console.log(res.data);
            const json =
              USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER"
                ? res.data.updatedObj.shareCurLoc
                : res.data.updatedObj.searcherCurLoc;
            const otherCurLoc = JSON.parse(json);
            console.log("other cur loc:", otherCurLoc);
            console.log("home screen user location #src: ", userLocation.src);
            console.log("home screen user location #des: ", userLocation.des);

            const distance = getDistance(userLocation.src, userLocation.des);
            if (distance < 10) {
              setIsArrivedModal(true);
              return clearInterval(interval);
            }
            dispatch(changeOtherUserLoc(otherCurLoc));
          })
          .catch((e) => console.log("error calling navigation updater ", e));
      }, 6 * 1000);
    }
  }, [askForLocation]);

  const y = useSharedValue(0);

  const [showBottomSheet, setShowBottomSheet] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header navigation={navigation} />

      {(USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER") && (
        <MyButton
          title={"Share parking"}
          onPress={navToShareScreen}
        />
      )}
      {USER_MODE === "SHARE" ||
        (USER_MODE.state === "SHARE" && showSearchLoading && (
          <View style={styles.searchMatchLoaderContainer}>
            <Text style={styles.waitingSearchText}>
              Waiting for parking match ...
            </Text>
            <ActivityIndicator color={"white"} style={{ marginRight: 10 }} />
          </View>
        ))}

      {carDetailsModal && (
        <CarDetailsModal
          modalVisible={carDetailsModal}
          setModalVisible={setCarDetailsModal}
          setIsParking={setIsParking}
        />
      )}

      {userLocation.src.latitude ? (
        <Map
          width={width}
          height={height}
          request={"FIND"}
          setCarDetailsModal={setCarDetailsModal}
          isParking={isParking}
        />
      ) : (
        <ActivityIndicator
          size="large"
          style={{ marginTop: "55%" }}
          color="#48D1CC"
        />
      )}

      <IsArrivedModal
        modalVisible={isArrivedModal}
        setModalVisible={setIsArrivedModal}
        setIsParking={setIsParking}
        setAskForLocation={setAskForLocation}
      />

      {showBottomSheet && (USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER") &&  (
        <BottomSheet
          showBottomSheet={(show) => setShowBottomSheet(show)}
          panY={y}
          handleSearch={handleSearch}
        />
      )} 
      {!showBottomSheet && (
        <Pressable
          style={styles.cancelBtn}
          onPress={
            (USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER") ? 
            stopSearching :
            stopSharing
          }
        >
          <Text style={{ color: "white", alignSelf: 'center' }}>
            {(USER_MODE === "SEARCHER" || USER_MODE.state === "SEARCHER") ? "Stop navigation" : "Stop sharing"} 
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancelBtn: {
    position: "absolute",
    bottom: 40,
    right: 10,
    left: 10,
    backgroundColor: "red",
    color: "white",
    height: 50,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  searchMatchLoaderContainer: {
    backgroundColor: "#48D1CC",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  waitingSearchText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    lineHeight: 21,
    marginHorizontal: 5,
  },
});
