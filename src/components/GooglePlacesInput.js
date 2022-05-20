import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GoogleMapKey from '../constants/google-map-api/googleMapKey';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


const GooglePlacesInput = () => {

    const [enable, setEnabled] = useState(true);
    
    return (
            <KeyboardAvoidingView behavior = {Platform.OS === "ios" ? "padding" : "height"} style = {styles.container} enabled = {enable} >
                <View>
                    <GooglePlacesAutocomplete
                    placeholder='Search'
                    
                    onPress={(data, details = null) => {
                    }}
                    query={{
                    key: {GoogleMapKey},
                    language: 'en',
                    }}
                    styles={{
                        textInputContainer: styles.containerStyle,
                        textInput: styles.textInputStyle
                    }}
                />
                            <Ionicons name='mic' size={40} color={'white'} style = {styles.mic} />
                            </View>
                        </KeyboardAvoidingView>

    );
  };
  
  export default GooglePlacesInput;

  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#f3f3f3'
    },
    mic: {
        backgroundColor: 'red',
        borderRadius: 40,
        borderColor: 'red',
        height: 50,
        marginRight: 20,
        position: 'absolute'
      },
});