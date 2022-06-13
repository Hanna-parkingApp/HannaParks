import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createContext, useEffect, useMemo, useReducer } from "react";
import AppStack from "../navigation/AppStack";
import AuthStack from "../navigation/AuthStack";
import LoadingScreen from "../screens/LoadingScreen";
import hannaServer from "../api/hannaServer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  showError, showSuccess } from "../constants/helpers/helperFunctions";
import { changeVerifyCodeSectionVisibility, selectVerifyCodeSectionVisiblity} from "../features/responseStatus/VerifyCodeVisiblity";
import {changeChangePasswordSectionVisibility, selectChangePasswordSectionVisiblity} from "../features/responseStatus/ChangePasswordVisiblity";
import {changeChangePasswordSuccess, selectChangePasswordSuccess} from "../features/responseStatus/ChangePasswordSuccess";
import { useDispatch } from "react-redux";
import { changeUserDetails } from "../features/profile/userDetailsSlice";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

export default Router = () => {

  const redux_dispatch = useDispatch();

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      console.log('@@@@ action type: ', action.token)
      console.log('@@@@ prevstate: ', prevState)
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            isConfirmed: true
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token || JSON.parse(action.token),
            isConfirmed: true
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isLoading: false,
            isSignout: true,
            userToken: null,
            isConfirmed: false,
            isSignout: false,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
            isConfirmed: true,
            userToken: action.token,
            isSignedIn: true
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isConfirmed: false,
      isSignedIn: false,
    }
  );

  const getToken = async () => {
    let userToken;
    let token_json;
    let newToken;
    console.log("get token");
    // try {
      userToken = await AsyncStorage.getItem("userToken");
      console.log(userToken);
      if (!userToken) {
        authContext.signOut();
        return;
      }
      token_json = JSON.parse(userToken);
      console.log('token_json: ', token_json);

    // } catch (e) {
    //   console.log("Restoring token failed. ", e);
    // }

    hannaServer.get('/autoLogin', {
      headers: {
        'x-access-token': `${token_json.accessToken}`,
        'x-refresh-token': `${token_json.refreshToken}`
      }
    })
    .then((res) => {
      console.log("res.data: ", res.data)
      const data = res.data;
      
      console.log("^^^^^^^^^^ data: ", data);

      redux_dispatch(changeUserDetails(data.user))
      return data;

    }).then(async (data) => {
      try {
        newToken = {
          accessToken: data.AccessToken,
          refreshToken: data.RefreshToken
        }
        await AsyncStorage.setItem('userToken', JSON.stringify(newToken))
        console.log("$$$ token is async storage $$$");

        // After restoring token, we may need to validate it in production apps

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({ type: "RESTORE_TOKEN", token: newToken });
      
      } catch (error) {
        console.log("Failed to set tokens in storage")
      }
    })
    .catch(error => {
      if (error.response) {
       
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      
      } else if (error.request) {
        
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      authContext.signOut();
    });
   
  };

  useEffect(() => {
    if (!state.isConfirmed)
      getToken();
  }, [state.isConfirmed, state.isSignout]);

  useEffect(() => {

  },[state.isSignedIn])

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`

        hannaServer
          .post("/login", data)
          .then((res) => {
            console.log(res)
              showSuccess("Login successfully. Welcome to hanna parks!")
              console.log("res.data.carDetail: ", res.data.carDetail)
              AsyncStorage.setItem(
                "userDetails",
                JSON.stringify(res.data.user)
              );
              AsyncStorage.setItem(
                "carDetails",
                JSON.stringify(res.data.carDetail)
              );
              console.log("save user details");
              AsyncStorage.setItem(
                "userToken",
                JSON.stringify(res.data.tokens)
              );
              redux_dispatch(changeUserDetails(res.data.user))
              dispatch({ type: "SIGN_IN", token: res.data.tokens });

            hannaServer.interceptors.request.use((config) => {
              config.headers["x-access-token"] = res.data.tokens;
              return config;
            });
          })
          .catch((err) => {
            showError("Login failed. Please try again.",err.data)
            // new Error (err)
            // if (err.match(/(^|\W)400($|\W)/)){
            //   showError("Login failed. The password or user is incorrect")
            // }
            console.log("error sign in", err);
          });
      },
      signOut: async () => {
        AsyncStorage.clear();
        dispatch({ type: "SIGN_OUT" });
      },

      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
       
        try {
          hannaServer
            .post("/register", data)
            // .then(res => console.log("res: ", res))
            .then((res) => {
              console.log(res.data);
              showSuccess("Register successfully.Welcome to hanna parks!")
              AsyncStorage.setItem(
                "userToken",
                JSON.stringify(res.data.tokens)
              );
              AsyncStorage.setItem(
                "userDetails",
                JSON.stringify(res.data.newUser)
              );
              AsyncStorage.setItem(
                "carDetails",
                JSON.stringify(res.data.newCar)
              );
              console.log("save user details");
              redux_dispatch(changeUserDetails(res.data.newUser))
              return res.data;
              //dispatch({ type: "SIGN_IN", token: res.data.tokens });
            })
            .then((data) => {
              console.log("reg proccess successfully")
              dispatch({ type: "SIGN_IN", token: data.tokens});
            })
        
          } catch (e) {
          showError("Register failed. Please try again.")
          console.log("error register", e);

        }
      },
      generateCode: async (data) => {
        console.log("check",data);
        try {
          hannaServer
            .post("/generateRecoveryCode", data)
            .then((res) => {
              console.log("check",res);

             if(res.status == 200){
              redux_dispatch(changeVerifyCodeSectionVisibility(true));
             } else {
              redux_dispatch(changeVerifyCodeSectionVisibility(false));
             }
            })
        } catch (e) {
          console.log("error generating recovery code", e);
          showError("generating recovery code failed. Please try again.",e)
        }
      },
      verifyCode: async (data) => {
        try {
          hannaServer
          .post("/verifyRecoveryCode", data)
          .then((res) => {
            if(res.status == 200){
              redux_dispatch(changeChangePasswordSectionVisibility(true));
             } else {
              redux_dispatch(changeChangePasswordSectionVisibility(false));
             }
          })
        } catch (e) {
          console.log("error verifying recovery code", e);
          showError("verifying recovery code failed. Please try again.",e)
        }
        
      },
      changePassword: async (data) => {
        try {
          hannaServer
            .post("/changePassword", data)
            .then((res) => {
              // AsyncStorage.setItem("changePassword", JSON.stringify(res.status));
              if(res.status == 200){
                redux_dispatch(changeChangePasswordSuccess(true));
              } else {
                redux_dispatch(changeChangePasswordSuccess(false));
              }
            })
        } catch (e) {
          
        }
      }
    }),
    []
  );

  console.log("state: ", state);
  if (state?.isLoading) {
    console.log("Loading app");
    // We haven't finished checking for the token yet
    return <LoadingScreen />;
  } else {
    console.log("Finished loading.Move to either AppStack or AutStack");
    console.log(state?.userToken)
    console.log("state.userToken != null ? ", state?.userToken != null)
    console.log("isConfirmed? ", state?.isConfirmed);
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state?.userToken != null && state?.isConfirmed ? (
          <AppStack />
        ) : (
          <AuthStack isSignout={state?.isSignout} />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
