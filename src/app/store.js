import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/location/locationSlice';
import carDetailReducer from '../features/car-detail/carDetailSlice';
import transactionReducer from '../features/transaction/transactionSlice';
import roleModeReducer from '../features/mode/roleModeSlice';
import userDetailsReducer from "../features/profile/userDetailsSlice";

export default configureStore({
    reducer: {
        location: locationReducer,
        carDetail: carDetailReducer,
        transaction: transactionReducer,
        roleMode: roleModeReducer,
        userDetails: userDetailsReducer
    }
})