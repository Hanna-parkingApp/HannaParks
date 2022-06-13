import { createSlice } from "@reduxjs/toolkit";

const changePasswordSuccessSlice = createSlice({
    name: 'changePasswordSuccess',
    initialState: 'false',
    reducers: {
        changeChangePasswordSuccess: (state, action) => ({
            //console.log("action payload mod: ", action.payload);
            state: action.payload
            //console.log(state);
        })
    }
})

export const { changeChangePasswordSuccess } = changePasswordSuccessSlice.actions;

export const selectChangePasswordSuccess = ({ changePasswordSuccess }) => changePasswordSuccess;

export default changePasswordSuccessSlice.reducer;