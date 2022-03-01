import { useState } from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import AddressPickup from "../components/AddressPickup";

const FindDestinationScreen = (props) => {

    const [desCoords, setDesCoords] = useState({});

    const fetchDestinationCoords = (lat, lng, zipCode, cityText) => {
        console.log("zip code ==> ", zipCode);
        console.log('city texts, ', cityText);
        setDesCoords({
            ...desCoords,
            desCoords: {
                latitude: lat,
                longitude: lng
            }
        })
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