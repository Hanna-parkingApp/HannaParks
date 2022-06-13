import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getHeaders = async (type) => {
    
    const token = await AsyncStorage.getItem('userToken');
    const token_json = JSON.parse(token);
    if (type === 'refresh') {
        return token_json.refreshToken;
    
    } else {
        return token_json.accessToken;
    }
}

export default axios.create({
    baseURL: 'http://hannaparks.cs.colman.ac.il:3000',
    // headers: {
    //     "x-refresh-token": getHeaders('refresh'),
    //     "x-access-token": getHeaders('access')
    // }
})



// axios.interceptors.request.use(
//     async config => {
//       const token = await AsyncStorage.getItem('userToken');
//       const json_token = JSON.parse(token);
//       if (json_token) {
//         config.headers.refreshToken = json_token.refreshToken;
//         config.headers.accessToken = json_token.accessToken;
//       }
//       return config
//     },
//     error => {
//       return Promise.reject(error)
//     }
//   );

