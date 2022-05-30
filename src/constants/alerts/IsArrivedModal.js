import { View, Text, StyleSheet, Modal } from 'react-native'
import React from 'react'
import MyButton from '../../components/MyButton';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { changeDesState } from '../../features/location/locationSlice';
import { changeOtherUserLoc } from '../../features/transaction/transactionSlice';

export default function IsArrivedModal({ modalVisible, setModalVisible, width, height, setIsParking }) {

    const dispatch = useDispatch();

    const handleArrivedBtn = () => {
        console.log("arrived btn pressed!")
        dispatch(changeDesState({ latitude: null, longitude: null, generalLoc: ''}))
        dispatch(changeOtherUserLoc({ latitude: null, longitude: null}))
        setIsParking(false);
        setModalVisible(false);
        showMessage("Arrive destination successfully!");


    }

    const handleNotArrivedBtn = () => {
        console.log("arrived btn pressed!")
        dispatch(changeOtherUserLoc({ latitude: null, longitude: null}))
        setIsParking(false);
        setModalVisible(false);
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
          <View style={[styles.centeredView]}>
            <View style={styles.modalView}>
            <Text style={styles.title}>Have you reached your destination?</Text>
            <View style={styles.buttons}>
                <MyButton title="Arrived (:" onPress={handleArrivedBtn} bgColor={'green'} />
                <MyButton title="Not yet ):" onPress={handleNotArrivedBtn} bgColor={'red'} />
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