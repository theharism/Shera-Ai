import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import YourAiAssistant from "./src/screens/onBoarding/YourAiAssistant";
import HelpUsGrow from "./src/screens/onBoarding/HelpUsGrow";
import EnableNotifications from "./src/screens/onBoarding/EnableNotifications";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function OnBoarding() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Your Ai Assistant" component={YourAiAssistant} />
        <Stack.Screen name="Help Us Grow" component={HelpUsGrow} />
        <Stack.Screen
          name="Enable Notifications"
          component={EnableNotifications}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <OnBoarding />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
