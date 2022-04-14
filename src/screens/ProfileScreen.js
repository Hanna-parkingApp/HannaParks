import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import HannaText from "../components/HannaText";
import imagePath from "../constants/imagePath";

import PickImageModal from "../constants/alerts/PickImageModal";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [carType, setcarType] = useState();
  const [CarModel, setCarModel] = useState();
  const [CarNumber, setCarNumber] = useState();
  const [points, setPoints] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [imageUrl, setImageUrl] = useState(imagePath.defIcUrlImg);
  const [isPicChanged, setIsPicChanged] = useState(false);

  const imageModalPicker = () => {
    console.log("add image pressed");
    setModalVisible(true);
  };

  const done = () => {
    navigation.navigate('Home')
    console.log("save changes");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <Ionicons name="ios-arrow-back" size={24} color="#52575D" onPress={() => navigation.navigate('Home')}></Ionicons>
      </View>
      <View style={{ alignSelf: "center" }}>
        {!modalVisible ? (
          <>
          <View style={styles.profileImage}>
            {!modalVisible && !isPicChanged && (
              <Image source={imagePath.icProfile} style={styles.image} resizeMode="center" />
            )}
            {!modalVisible && isPicChanged && (
              <Image source={{uri: imageUrl}} style={styles.image} resizeMode="center" />
            )}
        </View>
          <View style={styles.add}>
            <Pressable
              onPress={imageModalPicker}
            >
              <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
            </Pressable>
          </View>
        
          </>
        ) : (
          <PickImageModal 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible} 
          setImageUrl={setImageUrl}
          setIsPicChanged={setIsPicChanged} />
        )}
        </View>
        <View style={styles.formContainer}>
        <FormDetail
          labelValue={userName}
          placeholderText={"John Dong"}
          detailName={"User Name"}
        />
        <FormDetail
          labelValue={email}
          placeholderText={"johndo@gmail.com"}
          detailName={"Email"}
        />
        <FormDetail
          labelValue={carType}
          placeholderText={"Mercedes-Benz A-Class 2018"}
          detailName={"Car Brand"}
        />
         <FormDetail
          labelValue={CarNumber}
          placeholderText={"98-294-63"}
          detailName={"Car Num."}
        />
        </View>
        <View style = {styles.emptyBottom} />
        <View style = {styles.emptyBottom2} />
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
 
        // <FormDetail
        //   labelValue={password}
        //   placeholderText={"........"}
        //   detailName={"Password"}
        // />
    //     <FormDetail
    //       labelValue={carType}
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
    backgroundColor: "#F2F3F4"
  },
  titleBar: {
    flexDirection: "row-reverse",
    direction: 'ltr',
    marginTop: 24,
    marginHorizontal: 16,
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
  formContainer: {
    direction: 'ltr',
    marginHorizontal: 5,
    marginTop: 50,
    justifyContent: 'space-between',
  },
  emptyBottom: {
    backgroundColor: '#A3D1FF',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  emptyBottom2: {
    backgroundColor: '#F2F8FF',
    flex: 1,
  }
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
