import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  Easing,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";

import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import ImageScreen from "../components/ImageScreen";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";

import ChatScreen from "../components/ChatScreen";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import { COLORS } from "../constants/COLORS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { saveChats, setChatsData } from "../slices/chatsSlice";
import { setPoints } from "../slices/pointsSlice";

import {
  styles,
  FadeInView,
  config,
  customHeaderLeft,
  customHeaderRight,
} from "../constants/HeaderStyles";

SplashScreen.preventAutoHideAsync();

import OnBoarding from "./OnBoarding";
import Home from "./Home";

const Stack = createStackNavigator();

export default Screens = () => {
  const [visible, setVisible] = React.useState(false);
  const points = useSelector((state) => state.pointsSlice.points);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("chats");
        let size = await AsyncStorage.getItem("size");
        let points = await AsyncStorage.getItem("points");
        const chats = jsonValue != null ? JSON.parse(jsonValue) : null;
        size = parseInt(size);
        points = parseInt(points);
        return { chats, size, points };
      } catch (e) {
        console.log("Error: ", e);
        return { chats: null, size: null, points: null };
      }
    };

    getData().then(({ chats, size, points }) => {
      dispatch(setChatsData({ chats, size }));
      dispatch(setPoints({ points }));
    });
  }, []);

  useEffect(() => {
    const getAuthState = async () => {
      try {
        const authState = await AsyncStorage.getItem("authFlag");
        return authState === "yes" ? true : false;
      } catch (error) {
        console.log(error);
      }
    };

    getAuthState().then((flag) => {
      setFlag(flag);
    });
  }, []);

  useEffect(() => {
    async function saveAuthState() {
      if (flag) {
        console.log(flag);
        await AsyncStorage.setItem("authFlag", flag ? "yes" : "no");
      }
    }

    saveAuthState().then(() => {
      console.log("auth state saved as ", flag);
    });
  }, [flag]);

  const [fontsLoaded] = useFonts({
    "JosefinSans-Regular": require("../../assets/fonts/JosefinSans-VariableFont_wght.ttf"),
    "JosefinSans-Medium": require("../../assets/fonts/static/JosefinSans-Medium.ttf"),
    "JosefinSans-Bold": require("../../assets/fonts/static/JosefinSans-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SplashScreen Demo! 👋</Text>
      </View>
    );
  }

  if (fontsLoaded) {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    })();
  }

  const chatHeaderLeft = ({ navigation }) => {
    const { chats, size } = useSelector((state) => state.chatSlice);
    const points = useSelector((state) => state.pointsSlice.points);

    const handleSaveChatButtonPress = async () => {
      try {
        await AsyncStorage.setItem("chats", JSON.stringify(chats));
        await AsyncStorage.setItem("size", size.toString());
        await AsyncStorage.setItem("points", points.toString());

        console.log("Chat saved successfully!");
      } catch (error) {
        console.log("Error saving chat:", error);
      }
    };

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
            handleSaveChatButtonPress();
          }}
        >
          <Ionicons name="chevron-back-sharp" size={35} color={COLORS.white} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 35, height: 35, left: 60, bottom: 2 }}
        />
      </View>
    );
  };

  return (
    <NavigationContainer>
      {flag ? (
        <>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <Text>You have 10 points Left</Text>
            </Modal>
          </Portal>

          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTitle: "Shera Ai",
              headerTintColor: "#FFFFFF",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              gestureEnabled: true,
              gestureDirection: "horizontal",
              // transitionSpec: {
              //   open: config,
              //   close: config,
              // },
              headerMode: "screen",
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerLeft: customHeaderLeft,
                headerRight: () => customHeaderRight({ showModal, points }),
              }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={({ navigation }) => ({
                // headerTitle: "Shera Ai",
                // headerTintColor: "#FFFFFF",
                // headerStyle: styles.headerStyle,
                headerTitleStyle: styles.chatHeader,
                headerTitleAlign: "center",
                headerLeft: () => chatHeaderLeft({ navigation }),
                gestureDirection: "horizontal",
              })}
            />
            <Stack.Screen
              name="ImageScreen"
              component={ImageScreen}
              options={{
                headerLeft: customHeaderLeft,
                headerRight: () => customHeaderRight({ showModal, points }),
              }}
            />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <OnBoarding setFlag={setFlag} />
        </>
      )}
    </NavigationContainer>
  );
};
