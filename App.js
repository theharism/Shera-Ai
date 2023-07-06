import "react-native-gesture-handler";
import "react-native-reanimated";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import chatSlice from "./src/slices/chatsSlice";
import pointsSlice from "./src/slices/pointsSlice";
import imagesSlice from "./src/slices/imagesSlice";
import subscriptionSlice from "./src/slices/subscriptionSlice";
import { PaperProvider } from "react-native-paper";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Screens from "./src/Navigators/Screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useRef, useEffect, useState } from "react";
import { Platform } from "react-native";

const store = configureStore({
  reducer: {
    chatSlice,
    pointsSlice,
    imagesSlice,
    subscriptionSlice,
  },
});

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
