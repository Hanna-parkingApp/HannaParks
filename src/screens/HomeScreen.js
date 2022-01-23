import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import HannaText from '../components/HannaText'
import Map from '../components/Map'

const HomeScreen = ({navigation}) => {
    return (
      <View>
      <View>
        <HannaText></HannaText>
      </View>
      <SafeAreaView>
        <Map />
      </SafeAreaView>
      
    </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
