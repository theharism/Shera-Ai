import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Dimensions,
    Easing,
  } from "react-native";

  import React, { useState, useEffect } from "react";

import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import YourAiAssistant from "../screens/onBoarding/YourAiAssistant";
import HelpUsGrow from "../screens/onBoarding/HelpUsGrow";
import EnableNotifications from "../screens/onBoarding/EnableNotifications";

import { styles,FadeInView,config,customHeaderLeft,customHeaderRight } from "../constants/HeaderStyles";














const Stack = createStackNavigator();

export default OnBoarding = ({ setFlag }) => {
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