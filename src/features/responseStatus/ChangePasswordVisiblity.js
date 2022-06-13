import { createSlice } from "@reduxjs/toolkit";

const showChangePasswordSectionSlice = createSlice({
    name: 'showChangePasswordSection',
    initialState: 'false',
    reducers: {
        changeChangePasswordSectionVisibility: (state, action) => ({
            //console.log("action payload mod: ", action.payload);
            state: action.payload
            //console.log(state);
        })
    }
})

export const { changeChangePasswordSectionVisibility } = showChangePasswordSectionSlice.actions;

export const selectChangePasswordSectionVisiblity = ({ showChangePasswordSection }) => showChangePasswordSection;

export default showChangePasswordSectionSlice.reducer;