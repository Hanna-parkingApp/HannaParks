import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import BottomSearchBar from 'react-native-bottom-search-bar'
import MapView from 'react-native-maps'
import FormInput from './FormInput'

const Map = () => {
    return (
        <View>
            <MapView
                style = {styles.map}
                loadingEnabled = {true}
                region = {{
                latitude: 31.80344,
                longitude: 34.7911206,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
                }}
            /> 
            <View style={styles.searchContainer}>
                <TextInput
                style = {styles.search}
                placeholder={'Search'}
                placeholderTextColor={'#666'}
                />
            </View>    
            <BottomSearchBar 
                 height={100}
                 iPhoneXHeigh={150}
                 disableHomeButton
                 buttonBackgroundColor="#050191"
                 buttonText = "Navigate"
                 buttonOnPress={() => {}}
                 onChangeText={(text)=> {console.log(text)}}
                 searchBoxText = "Where to go?"
            />
        </View> 
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
     },
    searchContainer: {
        position: 'absolute',
        top: 10, 
        width: '100%', 
    },
    search: {
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
    }
})
