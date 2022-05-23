import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        isParkingAvail: false,
        otherUserLoc: {
            latitude: null,
            longitude: null
        }
    },
    reducers: {
        changeParkingAvailable: (state, action) => {
            state.isParkingAvail = action.payload;
        },
        changeOtherUserLoc: (state, action) => {
            console.log("$$$$$ coords: ", action.payload);
            let coords = action.payload;
            state.otherUserLoc.latitude = coords.latitude;
            state.otherUserLoc.longitude = coords.longitude; 
        }
    }
});

export const { changeParkingAvailable, changeOtherUserLoc } = transactionSlice.actions;

export const selectTransaction = ({ transaction }) => transaction;

export default transactionSlice.reducer;