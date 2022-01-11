import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import Map from '../components/Map'

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <Map />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
