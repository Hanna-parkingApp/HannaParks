import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuthState] = useState();

    const getAuth = async () => {
        try {
            const authDataString = await AsyncStorage.getItem('user');
            const authData = JSON.parse(authDataString || {});

            setAuthState(authData);
        
        } catch (e) {
            setAuthState({});
        } 
    }

    const setAuth = async (auth) => {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(auth));

            setAuthState(auth);
        
        } catch (e) {
            Promise.reject(e);
        }
    }

    useEffect(() => {
        getAuth();
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };