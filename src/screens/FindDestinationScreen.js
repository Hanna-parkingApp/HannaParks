import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import AddressPickup from "../components/AddressPickup";
import { changeDesState } from "../features/location/locationSlice";

const FindDestinationScreen = (props) => {

    const [desCoords, setDesCoords] = useState({});
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const fetchDestinationCoords = (lat, lng, city_name, st_name) => {
        console.log("city ==> ", city_name);
        console.log('street, ', st_name);
        let desLocation = {
            latitude: lat,
            longitude: lng
        }
        dispatch(changeDesState(desLocation));
        navigation.navigate('Home')
    }

    return (
        <View style = {styles.container}>
            <FlatList
            ListHeaderComponent={
            <>
             <View style = {{ marginBottom: 16 }} />
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
    )
};

export default FindDestinationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});