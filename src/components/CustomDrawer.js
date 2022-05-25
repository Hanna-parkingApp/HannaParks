import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import imagePath from "../constants/imagePath";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../routes/Router";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);
  const [userName, setUserName] = useState(null);

  const getUserDetails = async () => {
    const user = await AsyncStorage.getItem("userDetails");

    if (user !== null) {
      const user_json = JSON.parse(user);
      setUserName(user_json.fullName);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const navLogin = () => {
    signOut();
    // try {
    //   AsyncStorage.clear()
    // } catch (e) {
    //   console.log("error clear local storage", e);
    // }
    // navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#E5F4F9" }}
      >
        {userName && (
          <ImageBackground style={{ padding: 20 }}>
            <Image source={imagePath.icProfile} style={styles.profileImage} />
            <Text style={styles.username}>{userName}</Text>
          </ImageBackground>
        )}
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainerItems}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navLogin} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: "black",
    fontSize: 18,
    // fontFamily: 'Roboto-Medium',
  },
  items: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  bottomContainerItems: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});
