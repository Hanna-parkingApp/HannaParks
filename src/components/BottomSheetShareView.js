import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import AddressPickup from "./AddressPickup";
import { changeDesState } from "../features/location/locationSlice";


export default function BottomSheet() {

  const [dest, setDest] = useState();
  
  const navigation = useNavigation();

 const clearSearchContent = () => {
  setDest('');
 };
 const [desCoords, setDesCoords] = useState({});
 const dispatch = useDispatch();

 const fetchDestinationCoords = (lat, lng, city_name, st_name) => {
     console.log("city ==> ", city_name);
     console.log('street, ', st_name);
     let desLocation = {
         latitude: lat,
         longitude: lng,
         generalLoc: city_name
        }
     dispatch(changeDesState(desLocation));
    }


  const onPressLocation = () => {
    navigation.navigate('Find Destination');
  };

  return (
          <View style={styles.bottomCard}>
            <Text>parking location</Text>
            <FlatList
            ListHeaderComponent={
            <>
             <View style = {{ marginBottom: 16,flex: 1 }} />
                <AddressPickup 
                 placeholderText={"Enter Destination Location"}
                 fetchAddress = {fetchDestinationCoords}
                /> 
            </>}
            keyboardShouldPersistTaps='handled'
            style = {{ backgroundColor: 'white', flex: 1, padding: 24}}
            >
                 
            </FlatList>
          </View>
  );
}

const styles = StyleSheet.create({


});