import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default axios.create({
    baseURL: 'http://hannaparks.cs.colman.ac.il:3000',
    headers: {
        "x-refresh-token": `${AsyncStorage.getItem('userToken').then(res => {JSON.parse(res); return res.refreshToken})}`,
        "x-access-token": `${AsyncStorage.getItem('userToken').then(res => {JSON.parse(res); return res.accessToken})}`
    }
})

