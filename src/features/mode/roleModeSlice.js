import { createSlice } from "@reduxjs/toolkit";

const roleModeSlice = createSlice({
    name: 'role-mode',
    // initialState: 'SEARCHER',
    initialState: {
        mode: 'SEARCHER',
        isActive: false
    },
    reducers: {
        changeMode: (state, action) => {
            const payload = action.payload;
            state.mode = payload.mode;
            state.isActive = payload.isActive;
        }
    }
})

export const { changeMode } = roleModeSlice.actions;

export const selectRoleMode = ({ roleMode }) => roleMode;

export default roleModeSlice.reducer;