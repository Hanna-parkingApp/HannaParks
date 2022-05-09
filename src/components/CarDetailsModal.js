import { Text, Modal, StyleSheet, View, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import imagePath from '../constants/imagePath';
import MyButton from './MyButton';
import { useSelector } from 'react-redux';
import { selectCarDetail } from '../features/car-detail/carDetailSlice';
import NavigatePopUp from './NavigatePopUp';

export default function CarDetailsModal(props) {
    const {modalVisible, setModalVisible} = props;

    const [showNavPopup, setShowNavPopup] = useState(false);

    const carDetail = useSelector(selectCarDetail);
    console.log(" carDetail: ", carDetail);

    
    const handleCloseBtn = () => {
        setShowNavPopup(true);
        //setModalVisible(false);
    }

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        //onRequestClose={handleCloseBtn}
      >
          <View style={styles.modalView}>
              <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}} >
            <View style={styles.locationContainer}>
                <Text style={styles.title}>Car Location:</Text>
                <Text>St: Rambam 1</Text>
                <Text>{carDetail.generalLoc}</Text>
            </View>
            <View style={styles.locationContainer}>
                <Text style={styles.title}>Car Details:</Text>
                <Text>Suzoki SX4</Text>
                <Text>color: red</Text>
                <Text>Number: 82-292-54</Text>
            </View>
            </View>
            <View style={styles.imgContainer}>
                <Image source={imagePath.icProfile} resizeMode="center" style={{height:150, width:150}}/>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
            <MyButton title={"Park Me"} onPress={handleCloseBtn}/>
            {showNavPopup && (
                <NavigatePopUp isVisible={showNavPopup} setModalVisible={setModalVisible}/>
            )}
            </View>
          </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
    modalView: {
        height: '35%',
        marginBottom: 'auto',
        backgroundColor: 'yellow',
        marginTop: 65,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    locationContainer: {
        marginTop: 10,
        marginLeft: 10,
        padding: 30,

    },
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    imgContainer: {
        justifyContent: 'center'
    }
})