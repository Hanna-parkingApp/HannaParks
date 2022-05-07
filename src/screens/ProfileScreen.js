import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormDetail from "../components/FormDetail";
import imagePath from "../constants/imagePath";

import PickImageModal from "../constants/alerts/PickImageModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [carType, setCarType] = useState();
  const [CarModel, setCarModel] = useState();
  const [CarNumber, setCarNumber] = useState();
  const [points, setPoints] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [imageUrl, setImageUrl] = useState(imagePath.defIcUrlImg);
  const [isPicChanged, setIsPicChanged] = useState(false);

  const getUserDetails = async () => {
    const user = await AsyncStorage.getItem("userDetails");
    if (user !== null) {
      setUserDetails(JSON.parse(user));
    }
    console.log("user details - profile screen", userDetails);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const imageModalPicker = () => {
    console.log("add image pressed");
    setModalVisible(true);
  };

  const done = () => {
    navigation.navigate("Home");
    console.log("save changes");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="#52575D"
          onPress={() => navigation.navigate("Home")}
        ></Ionicons>
      </View>
      <View style={{ alignSelf: "center" }}>
        {!modalVisible ? (
          <>
            <View style={styles.profileImage}>
              {!modalVisible && !isPicChanged && (
                <Image
                  source={imagePath.icProfile}
                  style={styles.image}
                  resizeMode="center"
                />
              )}
              {!modalVisible && isPicChanged && (
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  resizeMode="center"
                />
              )}
            </View>
            <View style={styles.add}>
              <Pressable onPress={imageModalPicker}>
                <Ionicons
                  name="ios-add"
                  size={48}
                  color="#DFD8C8"
                  style={{ marginTop: 6, marginLeft: 2 }}
                ></Ionicons>
              </Pressable>
            </View>
          </>
        ) : (
          <PickImageModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setImageUrl={setImageUrl}
            setIsPicChanged={setIsPicChanged}
          />
        )}
      </View>
      {userDetails && (
        <View style={styles.formContainer}>
          <FormDetail
            labelValue={userName}
            placeholderText={userDetails["fullName"]}
            detailName={"User Name"}
          />
          <FormDetail
            labelValue={email}
            placeholderText={userDetails.email}
            detailName={"Email"}
          />
          {userDetails.cars.map((car, index) => {
            return (
              <View key={index}>
                <FormDetail
                  labelValue={carType}
                  placeholderText={car.type}
                  detailName={"Car Brand"}
                />
                <FormDetail
                  labelValue={CarNumber}
                  placeholderText={car.number}
                  detailName={"Car Num."}
                />
              </View>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F4",
  },
  titleBar: {
    flexDirection: "row-reverse",
    direction: "ltr",
    marginTop: 24,
    marginHorizontal: 16,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 200,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    direction: "ltr",
    marginHorizontal: 5,
    marginTop: 50,
    justifyContent: "space-between",
  },
  // container: {
  //   justifyContent: "center",
  //   marginTop: "50%",
  // },
  // headerDetails: {
  //   bottom: 10,
  //   left: '48%',
  //   borderWidth: 1,
  //   borderColor: "#1e90ff",
  //   borderStyle: "solid",
  //   width: 180,
  //   padding: 6,
  //   margin: 25,
  //   backgroundColor: "white",
  // },
  // headerItem : {
  //   padding: 2,
  //   fontWeight: '600',
  // },
  // buttonDone: {
  //   marginTop: 10,
  //   width: "100%",
  //   height: windowHeight / 15,
  //   backgroundColor: "#1e90ff",
  //   padding: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 3,
  //   color: "white",
  // },
  // profile: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "#1e90ff",
  //   // fontFamily: "Cochin",
  // },
  // input: {
  //   padding: 10,
  //   flex: 1,
  //   fontSize: 16,
  //   color: "#333",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
