
import React, {useContext, useState} from 'react';
import {Image, View, Text, TouchableOpacity, Platform, StyleSheet, Dimensions} from 'react-native';
import FormInput from '../components/FormInput';
import hannaServer from '../api/hannaServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../routes/Router';

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [confirmPassword, setconfirmPassword] = useState();
    const [username, setUserName    ] = useState();
    const [CarMake, setCarMake] = useState();
    const [CarModel, setCarModel] = useState();
    const [CarNumber, setCarNumber] = useState();

    const { signUp } = useContext(AuthContext);


    const register = async () => {
      console.log("user name: ", username)
      console.log("email: ", email)
      console.log("password: ", password);
      let data = {
        fullName: username,
        email: email,
        password: password
      }

      // try {
      //   hannaServer.post('/register', data)
      //   .then(res => console.log("register status: ", res))

      // } catch(e) {
      //   console.log("error register", e);
      // }

      // navigation.navigate('Login')
      // console.log("register Pressed")

      // instead:
      signUp(data);
      
    }


  return (
    <View style={styles.container}>
    {/* <Image source = {require('../assets/hanna_icon.png')} style = {styles.logo} />     */}

      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={username}
        placeholderText="Username"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setUserName}
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
        visible-password = {false}
      />

      {/* <FormInput
        labelValue={confirmPassword}
        placeholderText="Confirm Password"
        iconType="lock"
      /> */}

<FormInput
        labelValue={CarMake}
        placeholderText="CarMake"
        iconType="car"
      />

<FormInput
        labelValue={CarModel}
        placeholderText="Car Model"
        iconType="book"
      />

<FormInput
        labelValue={CarNumber}
        placeholderText="Car Number"
        iconType="database"
      />

      <TouchableOpacity
        onPress= {register}
        style = {styles.buttonContainer}
    >
        <Text style = {styles.buttonText}>Sign Up</Text>
       </TouchableOpacity>

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    //fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 22,
    marginBottom: 10,
    color: '#1e90ff',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1e90ff',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: '#1e90ff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

// import React, { useState } from 'react'
// import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
// import FormInput from '../components/FormInput'
// import HannaText from '../components/HannaText'



// const SignupScreen = ({ navigation }) => {

//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const [CarMake, setCarMake] = useState();
//     const [CarModel, setCarModel] = useState();
//     const [CarNumber, setCarNumber] = useState();


//     const register = () => {
//         navigation.navigate('Login')
//         console.log("register Pressed")
//     }
//     return (
//         <View>
//             <View>
//                 <HannaText></HannaText>
//                 </View>
//                 <View>
//                 <TouchableOpacity>
//                 <Text style={styles.signup}></Text>
//                 </TouchableOpacity> 
//             </View>
//             <View>
//                 <FormInput labelValue={email} placeholderText={"Enter your email address"} iconType={"user"}/>
//                 <FormInput labelValue={password} placeholderText={"Enter your password"} iconType={"lock"} />
//                 <FormInput labelValue={CarMake} placeholderText={"Enter your Car Make"} iconType={"car"} />
//                 <FormInput labelValue={CarModel} placeholderText={"Enter your Car Model"} iconType={"book"} />
//                 <FormInput labelValue={CarNumber} placeholderText={"Enter your Car Number"} iconType={"database"} />

//             </View>
//             <View>
//                 <TouchableOpacity
//                     style={styles.buttonContainer}
//                     onPress= {register}>
//                     <Text>Register</Text>
//                 </TouchableOpacity>     
//             </View>
//         </View>
//     )
// }

// export default SignupScreen

// const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         marginTop: '50%'
//     },
//     buttonContainer: {
//         marginTop: 10,
//         width: '100%',
//         height: windowHeight / 15,
//         backgroundColor: '#1e90ff',
//         padding: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 3,
//         color: "white"
//       },
//       signup: {
//         // fontSize: 15,
//         // // fontWeight: "bold",
//         // color:"black",
//         // margin:10,
//         // fontWeight: "bold",
//         // // fontFamily: "Cochin",

//     }
// })