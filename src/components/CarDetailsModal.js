import { Text, Modal, StyleSheet, View } from 'react-native'
import React from 'react'

export default function CarDetailsModal(props) {
    const {modalVisible, setModalVisible} = props;

    const handleCloseBtn = () => {

    }

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseBtn}
      >
          <View style={styles.modalView}>
            <Text>This is Modal</Text>
          </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
    modalView: {
        height: '50%',
        marginTop: 'auto',
        backgroundColor: 'blue'
    }
})