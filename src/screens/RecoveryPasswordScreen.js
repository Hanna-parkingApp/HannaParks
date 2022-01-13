import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import FormInput from '../components/FormInput'
import { HannaBtn } from '../components/HannaBtn'
import HannaText from '../components/HannaText'



const RecoveryPassword = () => {

    const [email, setEmail] = useState();

    const sendCode = () => {
        console.log("sendCode Pressed")
    }
    return (
        <View>
            <View>
                <HannaText></HannaText>
                </View>
                <View>
                <TouchableOpacity
                    style={styles.header}>
                <Text>Password Recovery</Text>
                </TouchableOpacity> 
            </View>
            <View>
                <FormInput labelValue={email} placeholderText={"Enter your email address"} iconType={"user"}/>

            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress= {sendCode}>
                    <Text>Send Code</Text>
                </TouchableOpacity>     
            </View>
        </View>
    )
}

export default RecoveryPassword

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
      header: {
        fontSize: 20,
        fontWeight: "bold",
        color:"#1e90ff",
        fontFamily: "Cochin",
    }
})
