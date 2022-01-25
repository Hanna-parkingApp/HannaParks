import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import FormInput from '../components/FormInput'
import HannaText from '../components/HannaText'



const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [CarMake, setCarMake] = useState();
    const [CarModel, setCarModel] = useState();
    const [CarNumber, setCarNumber] = useState();


    const register = () => {
        navigation.navigate('Login')
        console.log("register Pressed")
    }
    return (
        <View>
            <View>
                <HannaText></HannaText>
                </View>
                <View>
                <TouchableOpacity>
                <Text style={styles.signup}>Sign Up</Text>
                </TouchableOpacity> 
            </View>
            <View>
                <FormInput labelValue={email} placeholderText={"Enter your email address"} iconType={"user"}/>
                <FormInput labelValue={password} placeholderText={"Enter your password"} iconType={"lock"} />
                <FormInput labelValue={CarMake} placeholderText={"Enter your Car Make"} iconType={"car"} />
                <FormInput labelValue={CarModel} placeholderText={"Enter your Car Model"} iconType={"book"} />
                <FormInput labelValue={CarNumber} placeholderText={"Enter your Car Number"} iconType={"database"} />

            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress= {register}>
                    <Text>Register</Text>
                </TouchableOpacity>     
            </View>
        </View>
    )
}

export default SignupScreen

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
        color: "white"
      },
      signup: {
        fontSize: 20,
        fontWeight: "bold",
        color:"black",
        margin:10,
        fontWeight: "bold",
        fontFamily: "Cochin",

    }
})
