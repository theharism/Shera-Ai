import { createSlice } from "@reduxjs/toolkit";
import { deleteFromFirebae } from "../utilities/UploadImage";

const imagesSlice = createSlice({
  name: "images",
  initialState: { imageName: "" },
  reducers: {
    setName: (state, action) => {
      console.log(action);
      if (action.payload) {
        state.imageName = action.payload;
      }
    },
    deleteImage: (state) => {
      console.log("fff  ", state.imageName);
      if (state.imageName) {
        deleteFromFirebae(state.imageName);
      }
    },
  },
});

export const { setName, deleteImage } = imagesSlice.actions;
export default imagesSlice.reducer;
