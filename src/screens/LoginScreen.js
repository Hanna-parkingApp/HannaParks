import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import FormInput from '../components/FormInput'
import { HannaBtn } from '../components/HannaBtn'


const LoginScreen = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        console.log("Login Pressed")
    }

    return (
        <View>
            <View>
                <Text style={styles.container}>Hanna Parks</Text>
                <Text>Welcome Back</Text>
            </View>
            <View>
                <FormInput labelValue={email} placeholderText={"Write email"} iconType={"user"}/>
                <FormInput labelValue={password} placeholderText={"Write password"} iconType={"lock"} />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress= {login}
                >
                    <Text>Log in</Text>
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
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
      },
})
