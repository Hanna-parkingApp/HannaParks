import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button } from 'react-native'
import StyleSheetValidation from 'react-native/Libraries/StyleSheet/StyleSheetValidation'
import FormInput from '../components/FormInput'
import HannaText from '../components/HannaText'



const RecoveryPassword = () => {

    const [email, setEmail] = useState();

    const sendCode = () => {
        console.log("sendCode Pressed")
    }
    return (
        <View>
            <View>
                <HannaText />
                </View>
                <View>
                <TouchableOpacity>
                <Text style={styles.header}>Password Recovery</Text>
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
            <Button style={styles.btn} title='change password' />
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
    },
    btn: {
        marginHorizontal: 16,
        justifyContent: 'center',
        flex: 1
        
    }
})
