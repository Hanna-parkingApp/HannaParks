import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
    name: 'user-details',
    initialState: {
        email: "",
        fullName: "",
        carMaker: "",
        carModel: "",
        carNumber: "",
        carColor: "",
        points: 0,
    },
    reducers: {
        changeUserDetails: (state, action) => {
            const details = action.payload;
            state.email = details.email;
            state.fullName = details.fullName;
            state.carMaker = details.carMaker;
            state.carModel = details.carModel;
            state.carNumber = details.carNumber;
            state.carColor = details.carColor;
            state.points = details.points;
        }
    }
})

export const { changeUserDetails } = userDetailsSlice.actions;

export const selectUserDetails = ({ userDetails }) => userDetails;

export default userDetailsSlice.reducer;