import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native"
import { createContext, useEffect, useMemo, useReducer } from "react";
import AppStack from '../navigation/AppStack';
import AuthStack from '../navigation/AuthStack';
import LoadingScreen from '../screens/LoadingScreen';
import hannaServer from "../api/hannaServer";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

export default Router = () => {

    const [state, disptach] = useReducer(
        (prevState, action) => {
          console.log("prevstate: ", prevState);
          console.log("action: ", action);
            switch (action.type) {
              case 'RESTORE_TOKEN':
                return {
                  ...prevState,
                  userToken: action.token,
                  isLoading: false,
                };
              case 'SIGN_IN':
                return {
                  ...prevState,
                  isSignout: false,
                  userToken: action.token,
                };
              case 'SIGN_OUT':
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
            userToken = await AsyncStorage.getItem('userToken');
        
        } catch (e) {
            console.log("Restoring token failed. ", e);
        }

        // After restoring token, we may need to validate it in production apps

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        disptach({ type: 'RESTORE_TOKEN', token: userToken});
    }
    
    useEffect(() => {
        getToken();
    },[])

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
              // In a production app, we need to send some data (usually username, password) to server and get a token
              // We will also need to handle errors if sign in failed
              // After getting token, we need to persist the token using `SecureStore`

              hannaServer.post('/login', data) 
              .then(res => {
                try {
                    AsyncStorage.setItem('userToken', res.data.user.token)
                    disptach({ type: 'SIGN_IN', token: res.data.user.token })
                } catch (e) {
                  console.log("error setting token in local storage: ", e);
                }
        
                hannaServer.interceptors.request.use(
                    config => {
                      config.headers['x-access-token'] = res.data.user.token;
                      return config;
                    }
                )
              })
              .catch(err => {
                console.log("error sign in", err);
              }) 
              
            },
            signOut: async () => { 
              AsyncStorage.clear();
              disptach({ type: 'SIGN_OUT' })
            },

            signUp: async (data) => {
              // In a production app, we need to send user data to server and get a token
              // We will also need to handle errors if sign up failed
              // After getting token, we need to persist the token using `SecureStore`
              // In the example, we'll use a dummy token
              try {
                hannaServer.post('/register', data)
                .then(res => console.log("register status: ", res))
        
              } catch(e) {
                console.log("error register", e);
              }
      
              disptach({ type: 'SIGN_IN' });
            },
          }),
        []
    )

    if (state.isLoading) {
        console.log("Loading app");
        // We haven't finished checking for the token yet
        return <LoadingScreen />;
    } else {
      console.log("Finished loading.Move to either AppStack or AutStack")
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.userToken != null ? ( 
                <AppStack /> ) : (
                <AuthStack isSignout={state.isSignout} />  )}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}