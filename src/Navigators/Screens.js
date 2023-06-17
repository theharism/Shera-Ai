import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import ImageScreen from "../components/ImageScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";

import ChatScreen from "../components/ChatScreen";
import BottomSheetContent from "../components/BottomSheetContent";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import { COLORS } from "../constants/COLORS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { saveChats, setChatsData } from "../slices/chatsSlice";
import { setPoints } from "../slices/pointsSlice";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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
import PickAssets from "../components/PickAsset";
import PointsBottomSheet from "../components/PointsBottomSheet";
import Subscription from "../screens/subscription/Subscription";
import { deleteImage } from "../slices/imagesSlice";

const Stack = createStackNavigator();

export default Screens = () => {
  const [visible, setVisible] = React.useState(false);
  const points = useSelector((state) => state.pointsSlice.points);
  const showModal = PickAsset;
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  const PickAsset = () => {
    assetBottomSheet.current?.snapToIndex(0);
  };

  const assetBottomSheet = useRef(null);

  const bottomSheetModalRef = useRef(null);
  const bssnapPoints = useMemo(() => ["99.9%"], []);

  const showBottomSheet = () => {
    bottomSheetModalRef.current?.snapToIndex(0);
  };

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
        await AsyncStorage.setItem("authFlag", flag ? "yes" : "no");
      }
    }

    saveAuthState();
  }, [flag]);

  const [fontsLoaded] = useFonts({
    "JosefinSans-Regular": require("../../assets/fonts/JosefinSans-VariableFont_wght.ttf"),
    "JosefinSans-Medium": require("../../assets/fonts/static/JosefinSans-Medium.ttf"),
    "JosefinSans-Bold": require("../../assets/fonts/static/JosefinSans-Bold.ttf"),
    MaterialIcons: require("../../assets/fonts/MaterialIcons-Regular.otf"),
    GalanoGrotesqueBold: require("../../assets/fonts/GalanoGrotesqueBold.otf"),
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

  const imageHeaderLeft = ({ navigation }) => {
    //const imageName = useSelector((state) => state.imagesSlice.imageName);

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
            navigation.navigate("Explore");

            dispatch(deleteImage());
          }}
        >
          <Ionicons name="chevron-back-sharp" size={35} color={COLORS.white} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 40, height: 40, left: 65, bottom: 2 }}
        />
      </View>
    );
  };

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
          style={{ width: 40, height: 40, left: 65, bottom: 2 }}
        />
      </View>
    );
  };

  const customHeaderRight = ({ points }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Button
          icon="star"
          mode="contained"
          textColor="#000000"
          compact="true"
          buttonColor="#40e6b4"
          onPress={PickAsset}
        >
          {points}
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
  };

  return (
    <NavigationContainer>
      {flag ? (
        <>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTitle: "Shera Ai",
              headerTintColor: "#FFFFFF",
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              gestureEnabled: true,
              gestureDirection: "horizontal",
              headerMode: "screen",
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          >
            {points > 0 ? (
              <>
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
                    headerTitleStyle: styles.chatHeader,
                    headerTitleAlign: "center",
                    presentation: "modal",
                    headerLeft: () => chatHeaderLeft({ navigation }),
                    gestureDirection: "horizontal",
                  })}
                />
                <Stack.Screen
                  name="ImageScreen"
                  component={ImageScreen}
                  options={({ navigation }) => ({
                    headerTitleStyle: styles.chatHeader,
                    headerTitleAlign: "center",
                    headerLeft: () => imageHeaderLeft({ navigation }),
                    presentation: "modal",
                    gestureDirection: "horizontal",
                  })}
                />

                <Stack.Screen
                  name="Subscription"
                  component={Subscription}
                  options={{
                    headerTitle: "Try Pro for Free",
                    headerTintColor: "#FFFFFF",
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.onboardingHeader,
                    headerLeft: null,
                    cardStyleInterpolator:
                      CardStyleInterpolators.forVerticalIOS,
                    headerRight: () => (
                      <TouchableOpacity>
                        <Text style={styles.skipStyle}>Skip</Text>
                      </TouchableOpacity>
                    ),
                  }}
                />
              </>
            ) : (
              <Stack.Screen
                name="NewSubscription"
                component={Subscription}
                options={{
                  headerTitle: "Try Pro for Free",
                  headerTintColor: "#FFFFFF",
                  headerStyle: styles.headerStyle,
                  headerTitleStyle: styles.onboardingHeader,
                  headerLeft: null,
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                  headerRight: () => (
                    <TouchableOpacity>
                      <Text style={styles.skipStyle}>Skip</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
            )}
          </Stack.Navigator>

          <PointsBottomSheet assetBottomSheet={assetBottomSheet} />

          <BottomSheet
            snapPoints={bssnapPoints}
            ref={bottomSheetModalRef}
            index={-1}
            enablePanDownToClose={true}
            topInset={StatusBar.currentHeight}
            handleStyle={{
              backgroundColor: "#171717",
              borderColor: "#171717",
            }}
            handleIndicatorStyle={{ backgroundColor: "rgba(100,100,100,0.6)" }}
          >
            <BottomSheetContent />
          </BottomSheet>
        </>
      ) : (
        <>
          <OnBoarding setFlag={setFlag} />
        </>
      )}
    </NavigationContainer>
  );
};
