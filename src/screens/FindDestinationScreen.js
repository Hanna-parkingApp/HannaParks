import { useNavigation } from "@react-navigation/native";
import FindDestination from "../components/FindDestination";
import { showSuccess } from "../constants/helpers/helperFunctions";

const FindDestinationScreen = () => {

    const navigation = useNavigation();

    const handleSearchPress = () => {
        showSuccess("hello");
        //navigation.goBack('Home')
    }

    return (
        <FindDestination placeholderText={"Enter Destination Location"} handleSearch={handleSearchPress} />
    )
};

export default FindDestinationScreen;