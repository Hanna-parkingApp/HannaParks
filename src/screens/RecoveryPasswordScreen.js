import React, { useState } from 'react'
import { handleLogin, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions,KeyboardAvoidingView,TextInput,ScrollView } from 'react-native'
import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation'
import FormInput from '../components/FormInput'
import HannaText from '../components/HannaText'



const RecoveryPassword = ({ navigation }) => {

    const [email, setEmail] = useState();

    const sendCode = () => {
        navigation.navigate('Login')
        console.log("sendCode Pressed")
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Image source = {require('../assets/hanna_icon.png')} style = {styles.logo} />    
          <Text style={styles.text} >Password Recovery</Text>
                <FormInput
            labelValue={email}
            placeholderText="Enter your email address"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            />
                <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style = {styles.buttonContainer}>
            <Text style = {styles.buttonText}>Send Code</Text>
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
      paddingTop: 100
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
    },
    text: {
      fontSize: 24,
      marginBottom: 10,
      color: '#1e90ff',
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
      color: '#1e90ff',
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