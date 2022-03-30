import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormDetail from "../components/FormDetail";
import HannaText from "../components/HannaText";
import imagePath from "../constants/imagePath";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [CarMake, setCarMake] = useState();
  const [CarModel, setCarModel] = useState();
  const [CarNumber, setCarNumber] = useState();
  const [points, setPoints] = useState(0);

  const done = () => {
    navigation.navigate('Home')
    console.log("save changes");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
        <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
      </View>

      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image source={imagePath.icProfile} style={styles.image} resizeMode="center"></Image>
        </View>
        <View style={styles.dm}>
          <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
        </View>
        <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
          </View>
        </View>
    </SafeAreaView>
    // <View>
    //   <View>
    //     <HannaText />
    //   </View>
    //   <View style={styles.headerDetails}>
    //     <Text style={styles.headerItem}>Joined : 3 month ago </Text>
    //     <Text style={styles.headerItem}>My Points : {points}</Text>
    //   </View>
    //   <TouchableOpacity style={styles.profile}>
    //     <Text>profile</Text>
    //   </TouchableOpacity>
    //   <View>
    //     <FormDetail
    //       labelValue={email}
    //       placeholderText={"barshaya@gmail.com"}
    //       detailName={"Email"}
    //     />
    //     <FormDetail
    //       labelValue={password}
    //       placeholderText={"........"}
    //       detailName={"Password"}
    //     />
    //     <FormDetail
    //       labelValue={CarMake}
    //       placeholderText={"KIA"}
    //       detailName={"Car Make"}
    //     />
    //     <FormDetail
    //       labelValue={CarModel}
    //       placeholderText={"Picanto"}
    //       detailName={"Car Model"}
    //     />
    //     <FormDetail
    //       labelValue={CarNumber}
    //       placeholderText={"111111"}
    //       detailName={"Car No."}
    //     />
    //   </View>
    //   <View>
    //     <TouchableOpacity style={styles.buttonDone} onPress={done}>
    //       <Text>Done</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
};

export default ProfileScreen;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 200
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
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
    justifyContent: "center"
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
