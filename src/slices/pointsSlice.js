import { createSlice } from "@reduxjs/toolkit";

const pointsSlice = createSlice({
  name: "points",
  initialState: { points: 20 },
  reducers: {
    addPoints: (state, action) => {
      state.points += action.payload.value;
    },
    subtractPoints: (state, action) => {
      state.points -= action.payload.value;
    },
    setPoints: (state, action) => {
      const { points } = action.payload;

      if (points) {
        state.points = points;
      }
    }
  },
});

export const { addPoints, subtractPoints, setPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
