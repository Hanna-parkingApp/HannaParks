import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/location/locationSlice';
import authReducer from '../features/auth/authSlice';
import carDetailReducer from '../features/car-detail/carDetailSlice';
import transactionReducer from '../features/transaction/transactionSlice';
import roleModeReducer from '../features/mode/roleModeSlice';

export default configureStore({
    reducer: {
        location: locationReducer,
        userAuth: authReducer,
        carDetail: carDetailReducer,
        transaction: transactionReducer,
        roleMode: roleModeReducer,
    }
})