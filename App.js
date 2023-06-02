import "react-native-gesture-handler";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function OnBoarding({ setFlag }) {
  return (
    <Stack.Navigator initialRouteName="YourAiAssistant">
      <Stack.Screen
        name="YourAiAssistant"
        options={{
          headerTitle: "Your AI Assistant",
          headerTintColor: "#FFFFFF",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.onboardingHeader,
          headerLeft:null
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
          headerLeft:null
        }}
      />
      <Stack.Screen
        name="EnableNotifications"
        options={{
          headerTitle: "Enable Notifications",
          headerTintColor: "#FFFFFF",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.onboardingHeader,
          headerLeft:null
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
const customHeaderRight = ({ showModal }) => (
  <View style={{ flexDirection: "row" }}>
    <Button
      icon="star"
      mode="contained"
      textColor="#000000"
      compact="true"
      buttonColor="#40e6b4"
      onPress={showModal}
    >
      10
    </Button>
    <MaterialIcons
      name="account-circle"
      size={40}
      style={{ marginHorizontal: 10 }}
      color="#c0c0c0"
    />
  </View>
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

export default function App() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [flag, setFlag] = useState(false);

  const [fontsLoaded] = useFonts({
    "JosefinSans-Regular": require("./assets/fonts/JosefinSans-VariableFont_wght.ttf"),
    "JosefinSans-Medium": require("./assets/fonts/static/JosefinSans-Medium.ttf"),
    "JosefinSans-Bold":require('./assets/fonts/static/JosefinSans-Bold.ttf')
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

  return (
    <PaperProvider style={{ flex: 1 }}>
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
                headerLeft: customHeaderLeft,
                headerRight: () => customHeaderRight({ showModal }),
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
            </Stack.Navigator>
          </>
        ) : (
          <>
            <OnBoarding setFlag={setFlag} />
          </>
        )}
      </NavigationContainer>
    </PaperProvider>
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
    //fontWeight: "bold",
    fontFamily: "JosefinSans-Medium",
    fontSize: 25,
    left: 18,
    bottom: 2,
  },
  onboardingHeader: {
    //fontWeight: "bold",
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
