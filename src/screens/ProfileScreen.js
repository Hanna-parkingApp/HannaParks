import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FormDetail from "../components/FormDetail";
import HannaText from "../components/HannaText";

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
    <View>
      <View>
        <HannaText />
      </View>
      <View style={styles.headerDetails}>
        <Text style={styles.headerItem}>Joined : 3 month ago </Text>
        <Text style={styles.headerItem}>My Points : {points}</Text>
      </View>
      <TouchableOpacity style={styles.profile}>
        <Text>profile</Text>
      </TouchableOpacity>
      <View>
        <FormDetail
          labelValue={email}
          placeholderText={"barshaya@gmail.com"}
          detailName={"Email"}
        />
        <FormDetail
          labelValue={password}
          placeholderText={"........"}
          detailName={"Password"}
        />
        <FormDetail
          labelValue={CarMake}
          placeholderText={"KIA"}
          detailName={"Car Make"}
        />
        <FormDetail
          labelValue={CarModel}
          placeholderText={"Picanto"}
          detailName={"Car Model"}
        />
        <FormDetail
          labelValue={CarNumber}
          placeholderText={"111111"}
          detailName={"Car No."}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.buttonDone} onPress={done}>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: "50%",
  },
  headerDetails: {
    bottom: 10,
    left: '48%',
    borderWidth: 1,
    borderColor: "#1e90ff",
    borderStyle: "solid",
    width: 180,
    padding: 6,
    margin: 25,
    backgroundColor: "white",
  },
  headerItem : {
    padding: 2,
    fontWeight: '600',
  },    
  buttonDone: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#1e90ff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    color: "white",
  },
  profile: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e90ff",
    // fontFamily: "Cochin",
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
