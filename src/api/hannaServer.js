import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default axios.create({
    baseURL: 'http://hannaparks.cs.colman.ac.il:3000',
    // baseURL: 'http://127.0.0.1:3000',
    // headers: {
    //     "x-access-token": AsyncStorage.getItem('userToken') ? `${AsyncStorage.getItem('userToken')}` : "",
    // }
})
