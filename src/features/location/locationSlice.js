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
            console.log("payload")
            console.log(action.payload);
            let coords = action.payload.coords;
            state.src.latitude = coords.latitude;
            state.src.longitude = coords.longitude;
            console.log("location slice");
            console.log(state);
        },
        changeDesState: (state, action) => {
            console.log("%%%%%%%%%%%%%");
            let coords = action.payload;
            state.des.latitude = coords.latitude;
            state.des.longitude = coords.longitude;
        }
    }
});

export const { changeSrcState, changeDesState } = locationSlice.actions;

export const selectLocation = ({ location }) => location;

export default locationSlice.reducer;