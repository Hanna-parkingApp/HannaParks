import React, { useState,useEffect } from 'react'
import {handleLogin, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions,KeyboardAvoidingView,TextInput,ScrollView } from 'react-native'
import FormInput from '../components/FormInput'
import HannaText from '../components/HannaText'
import { useNavigation } from '@react-navigation/native';



const LoginScreen = ({ onFinished }) => {
    
    const navigation = useNavigation();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ currentUser, setCurrentUser ] = useState('');  
    
    const login = () => {
        navigation.navigate('Home')
        console.log("Login Pressed")
    }
    const recoveryPassword = () => {
        navigation.navigate('Recovery Password')
        console.log("recoveryPassword Pressed")
    }
    const signup = () => {
        navigation.navigate('Sign Up')
        console.log("signup Pressed")
    }  
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Image source = {require('../assets/hanna_icon.png')} style = {styles.logo} />          
          <Text style={styles.text} >Welcome Back!</Text>
          <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
    
          <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />

          <TouchableOpacity
        //   onPress = {handleLogin}
        onPress={() => navigation.navigate('Home')}
          style = {styles.buttonContainer}
          >
            <Text style = {styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          
          <TouchableOpacity style={styles.forgotButton}  onPress={recoveryPassword}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
    
    
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.navButtonText}>
              Don't have an acount? Create here
            </Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };
    
    export default LoginScreen;
    
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