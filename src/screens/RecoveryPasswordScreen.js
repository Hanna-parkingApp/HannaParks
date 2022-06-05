import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext } from 'react'
import { handleLogin, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions,KeyboardAvoidingView,TextInput,ScrollView } from 'react-native'
import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation'
import FormInput from '../components/FormInput'
import HannaText from '../components/HannaText'
import { AuthContext } from '../routes/Router';
import {  showError, showSuccess } from "../constants/helpers/helperFunctions";

const RecoveryPassword = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [recoveryCode, setrecoveryCode] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordAgain, setNewPasswordAgain] = useState();

    const { generateCode, verifyCode, changePassword } = useContext(AuthContext);

    const sendCode = async () => {
      console.log("sendCode Pressed");
      const data = { email: email };
      const res = await generateCode(data);
      
    }

    const checkCode = async () => {
      const data = { 
        password: recoveryCode,
        email: email
       };
      const res = await verifyCode(data);
      if (await AsyncStorage.getItem("verifyRecoveryCode") == 200) {
        showSuccess("Code Verifyied");
      }
      else {
        showError("Code Failed");
      }
    }

    const updatePassword = async () => {
      if (newPassword == newPasswordAgain) {
        const data = { 
          email: email,
          newPassword: newPassword 
        };
        const res = await changePassword(data)
        if (await AsyncStorage.getItem("changePassword") == 200) {
          showSuccess("Password Changed Successfully");
        }
        else {
          showError("Password Change Failed");
        }
      }
    }
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Image source = {require('../assets/hanna_icon.png')} style = {styles.logo} />    
          <Text style={styles.text} >Password Recovery</Text>
          <FormInput
            labelValue={email}
            onChangeText={(email) => setEmail(email)}
            placeholderText="Enter your email address"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => sendCode()}
            style = {styles.buttonContainer}>
            <Text style = {styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
          <FormInput
            labelValue={recoveryCode}
            onChangeText={(recoveryCode) => setrecoveryCode(recoveryCode)}
            placeholderText="Enter your recovery code"
            iconType="user"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => checkCode()}
            style = {styles.buttonContainer}>
            <Text style = {styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
          <FormInput
            labelValue={newPassword}
            onChangeText={(password) => setNewPassword(password)}
            placeholderText="Enter your new password"
            iconType="user"
            autoCapitalize="none"
          />
          <FormInput
            labelValue={newPasswordAgain}
            onChangeText={(newPasswordAgain) => setNewPasswordAgain(newPasswordAgain)}
            placeholderText="Enter your password again"
            iconType="user"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => updatePassword()}
            style = {styles.buttonContainer}>
            <Text style = {styles.buttonText}>Set Password</Text>
          </TouchableOpacity>
        </ScrollView>

    )
}

export default RecoveryPassword



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

 
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
      paddingTop: 100,
      backgroundColor: 'white'
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
      fontSize: 24,
      marginBottom: 10,
      color: '#48D1CC',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#48D1CC',
    },
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      height: windowHeight / 15,
      backgroundColor: '#48D1CC',
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