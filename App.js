import "react-native-gesture-handler";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Animated,
//   Dimensions,
//   Easing,
// } from "react-native";

// import { Ionicons } from "@expo/vector-icons";
// import { MaterialIcons } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect } from "react";

import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

// import { createStackNavigator } from "@react-navigation/stack";
// import { CardStyleInterpolators } from "@react-navigation/stack";
// import YourAiAssistant from "./src/screens/onBoarding/YourAiAssistant";
// import HelpUsGrow from "./src/screens/onBoarding/HelpUsGrow";
// import EnableNotifications from "./src/screens/onBoarding/EnableNotifications";
// import ImageScreen from "./src/components/ImageScreen";
// import ChatHome from "./src/screens/chat/ChatHome";
// import ExploreHome from "./src/screens/explore/ExploreHome";
// import RecentsHome from "./src/screens/recents/RecentsHome";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Button, Modal, Portal, PaperProvider } from "react-native-paper";
// import ChatScreen from "./src/components/ChatScreen";
// import * as SplashScreen from "expo-splash-screen";
// import { useFonts } from "expo-font";
// import { COLORS } from "./src/constants/COLORS";
//import AsyncStorage from "@react-native-async-storage/async-storage";
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












export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider style={{ flex: 1 }}>
        <Screens />
      </PaperProvider>
    </Provider>
  );
}
