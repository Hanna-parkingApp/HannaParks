import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        src: {
            latitude: 0,
            longitude: 0,
        },
        des: {
            latitude: 0,
            longitude: 0,
        }
    },
    reducers: {
        changeSrcState: (state, action) => {
            let coords = action.payload.coords;
            state.src.latitude = coords.latitude;
            state.src.longitude = coords.longitude;
        },
        changeDesState: (state, action) => {
            let coords = action.payload;
            state.des.latitude = coords.latitude;
            state.des.longitude = coords.longitude;
        }
    }
});

export const { changeSrcState, changeDesState } = locationSlice.actions;

export const selectLocation = ({ location }) => location;

export default locationSlice.reducer;