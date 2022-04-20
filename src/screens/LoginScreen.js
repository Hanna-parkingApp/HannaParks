import React, { useState,useEffect, useContext } from 'react'
import {handleLogin, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions,KeyboardAvoidingView,TextInput,ScrollView, Alert } from 'react-native'
import FormInput from '../components/FormInput'
import HannaText from '../components/HannaText'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import hannaServer from '../api/hannaServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { changeUserState, Login } from '../features/auth/authSlice';
import { AuthContext } from '../routes/Router';


const LoginScreen = ({ onFinished }) => {
    
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { signIn, signUp } = useContext(AuthContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ currentUser, setCurrentUser ] = useState('');  
    
    const handleLogin = async () => {
            
      console.log("Login Pressed");
      console.log(email, password);
      const data = {
        email: email,
        password: password
      }

      signIn(data);      

      // hannaServer.post('/login', data)
      // .then(res => {
      //   try {
      //   let token = JSON.stringify(res.data.token)
      //   AsyncStorage.setItem('token', token);
      //   } catch (e) {
      //     console.log("error setting token in local storage: ", e);
      //   }})

      //   try {
      //     const json = JSON.stringify(data);
      //     console.log(json);
      //     AsyncStorage.setItem('user', json)
      //   } catch (e) {
      //     console.log("error set user in local storage")
      //   }

      //   hannaServer.interceptors.request.use(
      //     config => {
      //       config.headers['x-access-token'] = res.data.token;
      //       return config;
      //     }
      //   )
      // }).then(() => setIsLoggedIn(true))
      // .catch(err => {
      //   console.log("error sign in", err);
      // })

      // if (isLoggedIn) {
      //   // navigation.navigate('Home');
      //   dispatch(changeUserState(user));

      // } else {
      //   Alert.alert("Wrong email or password");
      // }

    }

    const recoveryPassword = () => {
        navigation.navigate('Recovery Password')
        console.log("recoveryPassword Pressed")
    }

    const signup = () => {
        navigation.navigate('Sign Up')
        console.log("signup Pressed")
    }  

    useEffect(() => {
      if (isLoggedIn) {
        return;
      }

    }, [isLoggedIn])


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
        onPress={handleLogin}
          style = {styles.buttonContainer}
          >
            <Text style = {styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          
          <TouchableOpacity style={styles.forgotButton}  onPress={recoveryPassword}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
    
    
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={signup}>
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