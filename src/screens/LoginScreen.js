import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import FormInput from '../components/FormInput'
import { HannaBtn } from '../components/HannaBtn'
import HannaText from '../components/HannaText'



const LoginScreen = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        console.log("Login Pressed")
    }
    const recoveryPassword = () => {
        console.log("recoveryPassword Pressed")
    }
    const signup = () => {
        console.log("signup Pressed")
    }
    return (
        <View>
            <View>
                <HannaText></HannaText>
                </View>
                <View>
                <TouchableOpacity
                    style={styles.welcomeback}>
                <Text>Welcome Back!</Text>
                </TouchableOpacity> 
            </View>
            <View>
                <FormInput labelValue={email} placeholderText={"Enter your email address"} iconType={"user"}/>
                <FormInput labelValue={password} placeholderText={"Enter your password"} iconType={"lock"} />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress= {login}
                >
                    <Text>Log in</Text>
                </TouchableOpacity>     
            </View>
            <View>
            <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress= {recoveryPassword}
                >
                    <Text>Forget your password?</Text>
                </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress= {signup}
                >
                    <Text>Dont have a user? Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

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
        fontSize: 20,
        fontWeight: "bold",
        color:"#1e90ff",
        fontFamily: "Cochin",
        alignSelf: 'center'
    }
})
