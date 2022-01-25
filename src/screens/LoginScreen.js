import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import FormInput from '../components/FormInput'
import HannaText from '../components/HannaText'



const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        navigation.navigate('Home')
        console.log("Login Pressed")
    }
    const recoveryPassword = () => {
        navigation.navigate('Recovery Password')
        console.log("recoveryPassword Pressed")
    }
    const signup = () => {
        navigation.navigate('Sign up')
        console.log("signup Pressed")
    }
    return (
        <View>
            <View>
                <HannaText />
            </View>
            <View>
                <TouchableOpacity >
                <Text style={styles.welcomeback} >Welcome Back!</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FormInput labelValue={email} placeholderText={"Enter your email address"} iconType={"user"} />
                <FormInput labelValue={password} placeholderText={"Enter your password"} iconType={"lock"} />
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={login}>
                    <Text>Log in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginFooter}>
                <TouchableOpacity
                    onPress={recoveryPassword}>
                    <Text>Forget your password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginFooterItem}
                    onPress={signup}>
                    <Text>Dont have a user? Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: '50%'
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
    welcomeback: {
        fontSize: 18,
        color: "#1e90ff",
        // margin:10,
        fontWeight: "bold",
        fontFamily: "Cochin",
        alignSelf: 'center'

    },
    loginFooter:{
        margin:10,
        fontWeight: "bold",


    },
    loginFooterItem:{
        marginTop:5,

    }
})