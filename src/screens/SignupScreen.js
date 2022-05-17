import React, { useContext, useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import FormInput from "../components/FormInput";
import { AuthContext } from "../routes/Router";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fullName, setFullName] = useState();
  const [carMaker, setCarMaker] = useState();
  const [carModel, setCarModel] = useState();
  const [carNumber, setCarNumber] = useState();
  const [carColor, setCarColor] = useState();

  const { signUp } = useContext(AuthContext);

  const register = async () => {
    let data = {
      fullName: fullName,
      email: email,
      password: password,
      carMaker: carMaker,
      carModel: carModel,
      carNumber: carNumber,
      carColor: carColor,
    };
    signUp(data);
    //TODO: check if sign up success + add validations
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        labelValue={fullName}
        placeholderText="Full Name"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setFullName}
      />
      <FormInput
        labelValue={email}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setEmail}
      />
      <FormInput
        labelValue={password}
        placeholderText="Password"
        iconType="lock"
        onChangeText={setPassword}
        visible-password={false}
      />
      <FormInput
        labelValue={carMaker}
        placeholderText="Car Make"
        iconType="car"
        onChangeText={setCarMaker}
      />
      <FormInput
        labelValue={carModel}
        placeholderText="Car Model"
        iconType="car"
        onChangeText={setCarModel}
      />
      <FormInput
        labelValue={carNumber}
        placeholderText="Car Number"
        iconType="car"
        onChangeText={setCarNumber}
      />
      <FormInput
        labelValue={carColor}
        placeholderText="Car Color"
        iconType="car"
        onChangeText={setCarColor}
      />

      <TouchableOpacity onPress={register} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity onPress={() => alert("Terms Clicked!")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
          Privacy Policy
        </Text>
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 22,
    marginBottom: 10,
    color: "#48D1CC",
    marginTop: 40,
  },
  navButton: {
    // marginTop: 5,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#48D1CC",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
  },
  buttonContainer: {
    marginTop: 5,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#48D1CC",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
