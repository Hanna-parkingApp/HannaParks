import { View, Text, StyleSheet, Modal } from 'react-native'
import React from 'react'

export default function AbortShareModal({
    modalVisible, 
    setModalVisible, 
    setIsParking, 
    setAskForLocation }) {
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
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.buttons}>
                    <MyButton title="Share but don't wait for a match" onPress={handleArrivedBtn} bgColor={'green'} />
                    <MyButton title="Stop share, and back sea" onPress={handleNotArrivedBtn} bgColor={'red'} />
                </View>
              </View>

          </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 200,
        alignItems: "center",
        justifyContent: 'space-evenly',
        // flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
    },
    buttons: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 20
    },
})