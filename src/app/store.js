import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/location/locationSlice';
import carDetailReducer from '../features/car-detail/carDetailSlice';
import transactionReducer from '../features/transaction/transactionSlice';
import roleModeReducer from '../features/mode/roleModeSlice';
import userDetailsReducer from "../features/profile/userDetailsSlice";
import showVerifyCodeSectionSlice from "../features/responseStatus/VerifyCodeVisiblity";
import showChangePasswordSectionSlice from "../features/responseStatus/ChangePasswordVisiblity";
import changePasswordSuccessSlice from "../features/responseStatus/ChangePasswordSuccess";

export default configureStore({
    reducer: {
        location: locationReducer,
        carDetail: carDetailReducer,
        transaction: transactionReducer,
        roleMode: roleModeReducer,
        userDetails: userDetailsReducer,
        showVerifyCodeSection: showVerifyCodeSectionSlice,
        showChangePasswordSection: showChangePasswordSectionSlice,
        changePasswordSuccess: changePasswordSuccessSlice
    }
})