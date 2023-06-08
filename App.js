import "react-native-gesture-handler";
import "react-native-reanimated";

import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import YourAiAssistant from "./src/screens/onBoarding/YourAiAssistant";
import HelpUsGrow from "./src/screens/onBoarding/HelpUsGrow";
import EnableNotifications from "./src/screens/onBoarding/EnableNotifications";

import ChatHome from "./src/screens/chat/ChatHome";
import ExploreHome from "./src/screens/explore/ExploreHome";
import RecentsHome from "./src/screens/recents/RecentsHome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";
import ChatScreen from "./src/screens/chat/ChatScreen";
import BottomSheet, { useBottomSheet } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function OnBoarding({ setFlag }) {
  return (
    <Stack.Navigator
      initialRouteName="YourAiAssistant"
      screenOptions={{
        headerTitle: "Shera Ai",
        headerTintColor: "#FFFFFF",
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerLeft: customHeaderLeft,
      }}
    >
      <Stack.Screen name="YourAiAssistant">
        {(props) => <YourAiAssistant {...props} />}
      </Stack.Screen>
      <Stack.Screen name="HelpUsGrow" component={HelpUsGrow} />
      <Stack.Screen name="EnableNotifications">
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
const customHeaderRight = ({ showModal, showBottomSheet }) => (
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
      onPress={showBottomSheet}
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
            height: 53,
            borderTopColor: "#282828",
          },
          tabBarActiveTintColor: "#40e6b5",
          headerShown: false,
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
                size={24}
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
              <Ionicons name="ios-compass-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Recents"
          component={RecentsHome}
          options={{
            tabBarLabel: "Recents",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-timer-outline" size={24} color={color} />
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
  const bscontainerStyle = {
    color: "black",
  };

  const [flag, setFlag] = useState(false);

  const showBottomSheet = () => {
    console.log("Setbflag now true");
    setbFlag(true);
    bottomSheetModalRef.current?.snapToIndex(0);
  };

  const [bflag, setbFlag] = useState(false);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["99%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <PaperProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ height: "100%" }}>
        <NavigationContainer>
          {flag ? (
            <>
              {/* <BottomSheet isVisible={bflag} onClose={() => setbFlag(false)} /> */}

              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={containerStyle}
                >
                  <Animated.View>
                    <Text>You have 10 points Left</Text>
                  </Animated.View>
                </Modal>
              </Portal>

              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  tabBarStyle: {
                    backgroundColor: "#171717",
                    borderTopWidth: 1,
                    height: 53,
                    borderTopColor: "#282828",
                  },
                  tabBarActiveTintColor: "#40e6b5",
                  headerTitle: "Shera Ai",
                  headerTintColor: "#FFFFFF",
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.headerTitleStyle,
                  headerLeft: customHeaderLeft,
                  headerRight: () =>
                    customHeaderRight({
                      showModal,
                      showBottomSheet,
                    }),
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
              </Stack.Navigator>

              <BottomSheet
                snapPoints={snapPoints}
                ref={bottomSheetModalRef}
                index={-1}
                onChange={handleSheetChanges}
                enableHandlePanningGesture={true}
                animateOnMount={true}
                enablePanDownToClose={true}
                topInset={StatusBar.currentHeight}
                handleStyle={{ backgroundColor: "black" }}
                handleIndicatorStyle={{ backgroundColor: "gray" }}
              >
                <View
                  style={{
                    backgroundColor: "black",
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                    }}
                  >
                    Awesome
                  </Text>
                </View>
              </BottomSheet>
            </>
          ) : (
            <>
              <OnBoarding setFlag={setFlag} />
            </>
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
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
