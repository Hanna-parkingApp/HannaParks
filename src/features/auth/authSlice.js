import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import hannaServer from "../../api/hannaServer";

export const Login = createAsyncThunk(
    'userAuth/Login',
    async ({ data }) => {
      hannaServer.post('/login', data)
      .then(res => {
        try {
        AsyncStorage.setItem('token', res.data.token);
        } catch (e) {
          console.log("error setting token in local storage: ", e);
        }

        hannaServer.interceptors.request.use(
            config => {
              config.headers['x-access-token'] = res.data.token;
              return config;
            }
        )
      })
    }
)

const initialState = {
    isLoading: false,
    isSignout: null,
    userToken: null,
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setAuthAction: (state, action) => {
            switch(action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...state,
                        userToken: action.payload,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...state,
                        isSignout: false,
                        userToken: action.payload,
                    };
                case 'SIGN_OUT':
                    return {
                        ...state,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
    }
});

export const { setAuthAction } = authSlice.actions;

export const selectAuth = (state) => state;

export default authSlice.reducer;