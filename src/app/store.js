import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/location/locationSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
    reducer: {
        location: locationReducer,
        userAuth: authReducer,
    }
})