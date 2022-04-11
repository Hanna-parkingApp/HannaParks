import AsyncStorage from "@react-native-async-storage/async-storage";
import hannaServer from "../../api/hannaServer";

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('token fetched');
      dispatch({
        type: 'SIGN_IN',
        payload: token,
      })
    }
  }
}

export const Login = (data) => {
  return async dispatch => {
    let token = null;
    if (data != null) {
      // here we can use login api to get token and then store it
      hannaServer.post('/login', data)
      .then(res => {
          try {
            AsyncStorage.setItem('userToken', res.data.token)
            console.log('token stored');
          } catch (e) {
            console.log("error setting token in local storage: ", e);
          }
      })
    }
    dispatch({
      type: 'SIGN_IN',
      payload: token,
    })
  }
}



export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'SIGN_OUT'
    })
  }
}