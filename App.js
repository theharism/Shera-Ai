import "react-native-gesture-handler";
import "react-native-reanimated";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import chatSlice from "./src/slices/chatsSlice";
import pointsSlice from "./src/slices/pointsSlice";
import { PaperProvider } from "react-native-paper";

import Screens from "./src/Navigators/Screens";

const store = configureStore({
  reducer: {
    chatSlice,
    pointsSlice,
  },
});

import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ height: "100%" }}>
          <Screens />
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
}
