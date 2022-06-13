import { createSlice } from "@reduxjs/toolkit";

const carDetailSlice = createSlice({
  name: "location",
  initialState: {
    id: "",
    userId: " ",
    generalLoc: "",
    specificLoc: {
      latitude: null,
      longitude: null,
    },
    timeStamp: null,
    car: {
      carId: "",
      carMaker: "",
      carModel: "",
      carColor: "",
    },
  },
  reducers: {
    changeCarDetailState: (state, action) => {
      console.log("action payload: ", action.payload);
      let payload = action.payload;
      console.log("general location: ", payload.address);
      state.id = payload.id;
      state.userId = payload.userId;
      state.generalLoc = payload.generalLoc;
      state.specificLoc = payload.specificLoc;
      state.timeStamp = payload.timeStamp;
      state.car = payload.car;
    },
  },
});

export const { changeCarDetailState } = carDetailSlice.actions;

export const selectCarDetail = ({ carDetail }) => carDetail;

export default carDetailSlice.reducer;
