import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        src: {
            latitude: null,
            longitude: null,
        },
        des: {
            latitude: null,
            longitude: null,
            generalLoc: ''
        }
    },
    reducers: {
        changeSrcState: (state, action) => {
            let coords = action.payload.coords;
            state.src.latitude = coords.latitude;
            state.src.longitude = coords.longitude;
        },
        changeDesState: (state, action) => {
            console.log("action payload: ", action.payload)
            let coords = action.payload;
            state.des.latitude = coords.latitude;
            state.des.longitude = coords.longitude;
            state.des.generalLoc = coords.generalLoc;
        }
    }
});

export const { changeSrcState, changeDesState } = locationSlice.actions;

export const selectLocation = ({ location }) => location;

export default locationSlice.reducer;