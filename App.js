import "react-native-gesture-handler";
import "react-native-reanimated";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import chatSlice from "./src/slices/chatsSlice";
import pointsSlice from "./src/slices/pointsSlice";
import { PaperProvider } from "react-native-paper";
import { PermissionsAndroid } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import Screens from "./src/Navigators/Screens";

const store = configureStore({
  reducer: {
    chatSlice,
    pointsSlice,
  },
});

import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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

export default function App() {
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

const styles = StyleSheet.create({
  tabText: {
    fontSize: 12,
  },
  headerStyle: {
    backgroundColor: "#000000",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
    left: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  modalContent: {
    backgroundColor: "#1c1c1e",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingTop: 2,
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "red",
    borderRadius: 8,
    flex: 1,
    padding: 12,
  },
  closeButtonText: {
    backgroundColor: "#fff",
    alignSelf: "center",
    fontSize: 70,
    fontWeight: "bold",
  },
  bottomSheetContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
  },
});
