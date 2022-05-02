import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/location/locationSlice';
import authReducer from '../features/auth/authSlice';
import carDetailReducer from '../features/car-detail/carDetailSlice';

export default configureStore({
    reducer: {
        location: locationReducer,
        userAuth: authReducer,
        carDetail: carDetailReducer,
    }
})