import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createContext, useEffect, useMemo, useReducer } from "react";
import AppStack from "../navigation/AppStack";
import AuthStack from "../navigation/AuthStack";
import LoadingScreen from "../screens/LoadingScreen";
import hannaServer from "../api/hannaServer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  showError, showSuccess } from "../constants/helpers/helperFunctions";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

export default Router = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      console.log("actionnn-bar", action.token);
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token || JSON.parse(action.token),
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const getToken = async () => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      console.log("Restoring token failed. ", e);
    }

    // After restoring token, we may need to validate it in production apps

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    dispatch({ type: "RESTORE_TOKEN", token: userToken });
  };

  useEffect(() => {
    getToken();
  }, [state.userToken]);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`

        hannaServer
          .post("/login", data)
          .then((res) => {
            try {
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
              dispatch({ type: "SIGN_IN", token: res.data.tokens });
            } catch (e) {
              console.log("error setting token in local storage: ", e);
            }

            hannaServer.interceptors.request.use((config) => {
              config.headers["x-access-token"] = res.data.tokens;
              return config;
            });
          })
          .catch((err) => {
            showError("Login failed. Please try again.",err)
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
              showSuccess("Register successfully.Welcome to hanna parks!")
              AsyncStorage.setItem(
                "userToken",
                JSON.stringify(res.data.tokens)
              );
              dispatch({ type: "SIGN_IN", token: res.data.tokens });
            });
        } catch (e) {
          console.log("error register", e);
          showError("Register failed. Please try again.",e)

        }
      },
      generateCode: async (data) => {
        try {
          hannaServer
            .post("/generateRecoveryCode", data)
            .then((res) => {
              console.log(res)
              AsyncStorage.setItem("generateRecoveryCode", JSON.stringify(res.status));
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
            AsyncStorage.setItem("verifyRecoveryCode", JSON.stringify(res.status));
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
              AsyncStorage.setItem("changePassword", JSON.stringify(res.status));
            })
        } catch (e) {
          
        }
      }
    }),
    []
  );

  if (state.isLoading) {
    console.log("Loading app");
    // We haven't finished checking for the token yet
    return <LoadingScreen />;
  } else {
    console.log("Finished loading.Move to either AppStack or AutStack");
    console.log(state.userToken?.length || "not ok");
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken != null && state.userToken.length > 0 ? (
          <AppStack />
        ) : (
          <AuthStack isSignout={state.isSignout} />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
