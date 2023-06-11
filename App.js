import "react-native-gesture-handler";
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
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import YourAiAssistant from "./src/screens/onBoarding/YourAiAssistant";
import HelpUsGrow from "./src/screens/onBoarding/HelpUsGrow";
import EnableNotifications from "./src/screens/onBoarding/EnableNotifications";

import ChatHome from "./src/screens/chat/ChatHome";
import ExploreHome from "./src/screens/explore/ExploreHome";
import RecentsHome from "./src/screens/recents/RecentsHome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatScreen from "./src/components/ChatScreen";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { COLORS } from "./src/constants/COLORS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import chatSlice, { saveChats, setChatsData } from "./src/slices/chatsSlice";
import pointsSlice, { setPoints } from "./src/slices/pointsSlice";

const store = configureStore({
  reducer: {
    chatSlice,
    pointsSlice,
  },
});

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 300,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const FadeInView = (props, { navigation }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const slideAnim = React.useRef(new Animated.Value(1)).current; // Initial value for slide: SCREEN_WIDTH

  useFocusEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.poly(1)),
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.in(Easing.poly(1)),
      }).start();
    };
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [
          {
            translateX: slideAnim.interpolate({
              inputRange: [0, SCREEN_WIDTH],
              outputRange: [0, SCREEN_WIDTH],
              extrapolate: "clamp",
            }),
          },
        ],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

function OnBoarding({ setFlag }) {
  return (
    <Stack.Navigator
      initialRouteName="YourAiAssistant"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: config,
          close: config,
        },
        headerMode: "float",
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="YourAiAssistant"
        options={{
          headerTitle: "Your AI Assistant",
          headerTintColor: "#FFFFFF",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.onboardingHeader,
          headerLeft: null,
        }}
      >
        {(props) => <YourAiAssistant {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="HelpUsGrow"
        component={HelpUsGrow}
        options={{
          headerTitle: "Help Us Grow",
          headerTintColor: "#FFFFFF",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.onboardingHeader,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="EnableNotifications"
        options={{
          headerTitle: "Enable Notifications",
          headerTintColor: "#FFFFFF",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.onboardingHeader,
          headerLeft: null,
        }}
      >
        {(props) => <EnableNotifications setFlag={setFlag} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const customHeaderLeft = (prop) => (
  <Image
    source={require("./assets/logo.png")}
    style={{ width: 35, height: 35, left: 25, bottom: 2 }}
  />
);

const customHeaderRight = ({ showModal, points }) => (
  <View style={{ flexDirection: "row" }}>
    <Button
      icon="star"
      mode="contained"
      textColor="#000000"
      compact="true"
      buttonColor="#40e6b4"
      onPress={showModal}
    >
      {points}
    </Button>
    <MaterialIcons
      name="account-circle"
      size={40}
      style={{ marginHorizontal: 10 }}
      color="#c0c0c0"
    />
  </View>
);

const FadeHomeScreen = (props, { navigation }) => (
  <FadeInView>
    <ChatHome {...props} />
  </FadeInView>
);

const FadeHomeScree = (props, { navigation }) => (
  <FadeInView>
    <ExploreHome {...props} />
  </FadeInView>
);

const FadeHomeScre = (props, { navigation }) => (
  <FadeInView>
    <RecentsHome {...props} />
  </FadeInView>
);

function Home() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Chat"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#171717",
            borderTopWidth: 1,
            height: 75,
            borderTopColor: "#282828",
          },
          tabBarLabelStyle: {
            bottom: 15,
            fontFamily: "JosefinSans-Medium",
            fontSize: 14,
          },
          tabBarActiveTintColor: "#40e6b5",
          headerShown: false,
          tabBarHideOnKeyboard: true,
          //tabBarButton: (props) => <SlideInView>{props.children}</SlideInView>,
        }}
      >
        <Tab.Screen
          name="Chat"
          component={ChatHome}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="ios-chatbubbles-outline"
                size={27}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreHome}
          options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-compass-outline" size={27} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Recents"
          component={RecentsHome}
          options={{
            tabBarLabel: "Recents",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-timer-outline" size={27} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

function Screens() {
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
      await AsyncStorage.setItem("authFlag", flag ? "yes" : "no");
    }

    saveAuthState().then(() => {
      console.log("auth state saved as ",flag);
    });
  },[flag]);

  const [fontsLoaded] = useFonts({
    "JosefinSans-Regular": require("./assets/fonts/JosefinSans-VariableFont_wght.ttf"),
    "JosefinSans-Medium": require("./assets/fonts/static/JosefinSans-Medium.ttf"),
    "JosefinSans-Bold": require("./assets/fonts/static/JosefinSans-Bold.ttf"),
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
          source={require("./assets/logo.png")}
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

          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "Shera Ai",
                headerTintColor: "#FFFFFF",
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.headerTitleStyle,
                headerLeft: customHeaderLeft,
                headerRight: () => customHeaderRight({ showModal, points }),
              }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={({ navigation }) => ({
                headerTitle: "Shera Ai",
                headerTintColor: "#FFFFFF",
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.chatHeader,
                headerTitleAlign: "center",
                headerLeft: () => chatHeaderLeft({ navigation }),
                gestureDirection: "horizontal",
              })}
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
}

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider style={{ flex: 1 }}>
        <Screens />
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
    fontFamily: "JosefinSans-Medium",
    fontSize: 25,
    left: 18,
    bottom: 2,
  },
  chatHeader: {
    fontFamily: "JosefinSans-Medium",
    fontSize: 25,
    bottom: 2,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  onboardingHeader: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 25,
    bottom: 2,
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
    fontFamily: "JosefinSans-Medium",
  },
});
