import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import YourAiAssistant from "./src/screens/onBoarding/YourAiAssistant";
import HelpUsGrow from "./src/screens/onBoarding/HelpUsGrow";
import EnableNotifications from "./src/screens/onBoarding/EnableNotifications";
import ChatHome from "./src/screens/chat/ChatHome";
import ExploreHome from "./src/screens/explore/ExploreHome";
import RecentsHome from "./src/screens/recents/RecentsHome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function OnBoarding() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="YourAiAssistant" component={YourAiAssistant} />
      <Stack.Screen name="HelpUsGrow" component={HelpUsGrow} />
      <Stack.Screen
        name="EnableNotifications"
        component={EnableNotifications}
      />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#171717",  borderTopWidth: 1,
        height: 53,borderTopColor:'#282828' },
        tabBarActiveTintColor: "#40e6b5",

      }}
    >
      <Tab.Screen
        name="Chat"
        component={ChatHome}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles-outline" size={24} color={color} />
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontSize: 12,
  },
});
