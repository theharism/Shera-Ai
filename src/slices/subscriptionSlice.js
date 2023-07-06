import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: { subscription: false },
  reducers: {
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { setSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
