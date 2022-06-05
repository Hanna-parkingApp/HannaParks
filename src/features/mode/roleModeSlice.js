import { createSlice } from "@reduxjs/toolkit";

const roleModeSlice = createSlice({
    name: 'role-mode',
    // initialState: 'SEARCHER',
    initialState: 'SEARCHER',
    reducers: {
        changeMode: (state, action) => ({
            //console.log("action payload mod: ", action.payload);
            state: action.payload
            //console.log(state);
        })
    }
})

export const { changeMode } = roleModeSlice.actions;

export const selectRoleMode = ({ roleMode }) => roleMode;

export default roleModeSlice.reducer;