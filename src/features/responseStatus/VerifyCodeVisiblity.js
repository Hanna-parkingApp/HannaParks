import { createSlice } from "@reduxjs/toolkit";

const showVerifyCodeSectionSlice = createSlice({
    name: 'showVerifyCodeSection',
    initialState: 'false',
    reducers: {
        changeVerifyCodeSectionVisibility: (state, action) => ({
            //console.log("action payload mod: ", action.payload);
            state: action.payload
            //console.log(state);
        })
    }
})

export const { changeVerifyCodeSectionVisibility } = showVerifyCodeSectionSlice.actions;

export const selectVerifyCodeSectionVisiblity = ({ showVerifyCodeSection }) => showVerifyCodeSection;

export default showVerifyCodeSectionSlice.reducer;