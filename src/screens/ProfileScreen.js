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
import MyButton from "../components/MyButton";
import { TextInput } from "react-native-gesture-handler";
import hannaServer from "../api/hannaServer";

const ProfileScreen = ({ navigation }) => {
  const initialState = {
    email: "",
    fullName: "",
    carMaker: "",
    carModel: "",
    carNumber: "",
    carColor: "",
    points: 0,
  };

  const [userDetails, setUserDetails] = useState(initialState);
  const [carDetails, setCarDetails] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const [imageUrl, setImageUrl] = useState(imagePath.defIcUrlImg);
  const [isPicChanged, setIsPicChanged] = useState(false);

  const getUserDetails = async () => {
    const user = await AsyncStorage.getItem("userDetails");
    const car = await AsyncStorage.getItem("carDetails");
    let carDetObj = {};
    let userDetObj = {};
    if (user !== null) {
      const user_json = JSON.parse(user);
      userDetObj = {
        email: user_json.email,
        fullName: user_json.fullName,
        points: user_json.points,
      };
    }
    if (car !== null) {
      const carArray = JSON.parse(car);
      if (carArray.length > 0) {
        carDetObj = {
          carModel: carArray[0].model,
          carMaker: carArray[0].make,
          carNumber: carArray[0].registrationNumber,
          carColor: carArray[0].color,
        };
      }
    }

    const finalDetails = Object.assign(userDetObj, carDetObj);
    console.log(finalDetails);
    setUserDetails(finalDetails);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (!userDetails) return;
    if (!carDetails) return;
  }, [userDetails, carDetails]);

  const imageModalPicker = () => {
    console.log("add image pressed");
    setModalVisible(true);
  };

  const saveUserDetails = () => {
    try {
      console.log("IMAGE URL", imageUrl);
      hannaServer
        .post("/update-profile", userDetails)
        .then((res) => console.log(res));
    } catch (e) {
      console.log("Error update profile", e);
    }

    console.log("save changes");
    // navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="#52575D"
          onPress={() => navigation.navigate("Home")}
        />
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
          <TextInput>Points: {userDetails.points}</TextInput>
          <FormDetail
            labelValue={userDetails.fullName}
            placeholderText="Full Name"
            detailName={"Full Name"}
            onChangeText={(t) =>
              setUserDetails({ ...userDetails, fullName: t })
            }
          />
          <FormDetail
            labelValue={userDetails.email}
            placeholderText="Email"
            detailName={"Email"}
            editable={false}
          />
          {userDetails && (
            <View>
              <FormDetail
                labelValue={userDetails.carMaker}
                placeholderText="Car Maker"
                detailName={"Car Maker"}
                onChangeText={(t) =>
                  setUserDetails({ ...userDetails, carMaker: t })
                }
              />
              <FormDetail
                labelValue={userDetails.carModel}
                placeholderText="Car Model"
                detailName={"Car Model"}
                onChangeText={(t) =>
                  setUserDetails({ ...userDetails, carModel: t })
                }
              />
              <FormDetail
                labelValue={userDetails.carNumber}
                placeholderText="Car Num."
                detailName={"Car Num."}
                onChangeText={(t) =>
                  setUserDetails({ ...userDetails, carNumber: t })
                }
              />
              <FormDetail
                labelValue={userDetails.carColor}
                placeholderText="Car Color"
                detailName={"Car Color"}
                onChangeText={(t) =>
                  setUserDetails({ ...userDetails, carColor: t })
                }
              />
            </View>
          )}
          <MyButton title={"Save"} onPress={saveUserDetails} />
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
    width: 160,
    height: 150,
    borderRadius: 100,
  },
  profileImage: {
    width: 160,
    height: 150,
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
    marginHorizontal: 2,
    marginTop: 20,
    justifyContent: "space-between",
  },
});
