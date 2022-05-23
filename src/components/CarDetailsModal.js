import { Text, Modal, StyleSheet, View, Image } from 'react-native'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, {useEffect, useState} from 'react'
import imagePath from '../constants/imagePath';
import Button from './Button';
import { useSelector } from 'react-redux';
import { selectCarDetail } from '../features/car-detail/carDetailSlice';
import NavigatePopUp from './NavigatePopUp';
import hannaServer from '../api/hannaServer';

export default function CarDetailsModal(props) {
    const {modalVisible, setModalVisible, setIsParking} = props;

    const [showNavPopup, setShowNavPopup] = useState(false);

    const carDetail = useSelector(selectCarDetail);
    
    console.log(" carDetail: ", carDetail);

    
    const handleCloseBtn = async () => {
        // console.log("carDetail: ####", carDetail.userId)
        // hannaServer.post('/update-parking-status', carDetail.userId)
        // .then(() => {
            setIsParking(true);
            setModalVisible(false);
        // })
        // .catch(e => console.log(e.response))
    }

    useEffect(() => {
        console.log("modalVisible: ", modalVisible);
    },[modalVisible])

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        // onRequestClose={handleCloseBtn}
        >
          <View style={styles.modalView}>
              <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}} >
            <View style={styles.locationContainer}>
                <Text>St: Rambam 1 // TOdo: Update location</Text>
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
            <View style={{  right:'20%' ,top: '-3r%',justifyContent: 'flex-end'}}>
            <Button title={"Park Me"} onPress={handleCloseBtn}/>
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
        height: '34%',
        marginBottom: 'auto',
        backgroundColor: '#48D1CC',
        marginTop: 58,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-around',
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
        justifyContent: 'space-around',
        height: '85%',

    }
})