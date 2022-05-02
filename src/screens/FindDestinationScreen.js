import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FindDestination from "../components/FindDestination";
import { selectLocation } from "../features/location/locationSlice";

const FindDestinationScreen = () => {

    const navigation = useNavigation();

    const handleSearchPress = () => {
        navigation.goBack('Home')
    }

    return (
        <FindDestination placeholderText={"Enter Destination Location"} handleSearch={handleSearchPress} />
    )
};

export default FindDestinationScreen;