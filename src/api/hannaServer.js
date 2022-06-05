import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const token = "x-refresh-token";

export default axios.create({
    baseURL: 'http://hannaparks.cs.colman.ac.il:3000',
})

