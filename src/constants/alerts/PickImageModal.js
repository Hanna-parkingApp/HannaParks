import { View, Text, Modal, SafeAreaView, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Platform } from 'expo-modules-core';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


const PickImageModal = ({ modalVisible, setModalVisible, setImageUrl, setIsPicChanged}) => {

    const openGallery = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied!');
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            })
            console.log(result);
            if (!result.cancelled) {
                setImageUrl(result.uri);
                setIsPicChanged(true);
                setModalVisible(false)
            }            
        }
    }

    const openCamera = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied!');
                return;
            }
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            })
            console.log(result);
            if (!result.cancelled) {
                setImageUrl(result.uri);
                setIsPicChanged(true);
                setModalVisible(false)
            }
        }
    }

    const createPermissionsDialoge = (type) => {
       
    }

  return (
    <View style={styles.centeredView}>
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style = {styles.centeredView}>
                <View style={styles.titleBar}>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <Ionicons name="close" size={24} color="#52575D"></Ionicons>
                    </Pressable>
                 </View>

                <View style={styles.modalView}>
                    <SafeAreaView>
                        <Text style={styles.title}>Pick a profile image from</Text>
                        <View style={styles.actionBtnContainer}>
                            <Pressable onPress={openGallery}>
                                <Text style={styles.btn}>Gallery</Text>
                            </Pressable>
                            <Pressable onPress={openCamera}>
                                <Text style={styles.btn}>Camera</Text>
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </View>

            </View>
        </Modal>
      
    </View>
  )
}

export default PickImageModal

const styles = StyleSheet.create({
    centeredView: {
        flexDirection: 'row',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginRight: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 200,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
    },
    title: {
        fontSize: 15,
    },
    actionBtnContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        alignItems: 'center',
        fontSize: 20,
        
    },
});