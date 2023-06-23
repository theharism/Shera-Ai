import { Text, View, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import React, { useState, useEffect, useMemo, useRef } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import ImageScreen from "../components/ImageScreen";

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

import ChatScreen from "../components/ChatScreen";
import BottomSheetContent from "../components/BottomSheetContent";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

import { COLORS } from "../constants/COLORS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setChatsData } from "../slices/chatsSlice";
import { setPoints } from "../slices/pointsSlice";

import BottomSheet from "@gorhom/bottom-sheet";

import { styles } from "../constants/HeaderStyles";

SplashScreen.preventAutoHideAsync();

import OnBoarding from "./OnBoarding";
import Home from "./Home";
import PointsBottomSheet from "../components/PointsBottomSheet";
import Subscription from "../screens/subscription/Subscription";
import { deleteImage } from "../slices/imagesSlice";
import { handleSaveChatButtonPress } from "../utilities/SaveData";
import CheckInternet from "../utilities/CheckInternet";

const Stack = createStackNavigator();

export default Screens = () => {
  const showModal = PickAsset;

  const { chats, size } = useSelector((state) => state.chatSlice);
  const points = useSelector((state) => state.pointsSlice.points);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    {
      points == 0 ? handleSaveChatButtonPress(chats, size, points) : null;
    }
  }, [points]);

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
      </View>
    );
  };

  const ChatHeaderLeft = ({ navigation }) => {
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
            handleSaveChatButtonPress(chats, size, points);
          }}
        >
          <Ionicons name="chevron-back-sharp" size={35} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    );
  };

  const HeaderTitle = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 40, height: 40, bottom: 2 }}
        />
        <Text style={styles.headerTitleStyle}>Shera Ai</Text>
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

  const CustomHeaderTitle = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 40, height: 40, left: 5, bottom: 2 }}
        />
        <Text style={styles.headerTitleStyle}>Shera Ai</Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      {isConnected ? (
        <>
          {flag ? (
            <>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerTintColor: "#FFFFFF",
                  headerStyle: styles.headerStyle,
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                  headerMode: "screen",
                  animationEnabled: true,
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
              >
                {points > 0 ? (
                  <>
                    <Stack.Screen
                      name="Home"
                      component={Home}
                      options={{
                        headerTitle: () => <CustomHeaderTitle />,

                        headerRight: () =>
                          customHeaderRight({ showModal, points }),
                      }}
                    />
                    <Stack.Screen
                      name="ChatScreen"
                      component={ChatScreen}
                      options={({ navigation }) => ({
                        headerTitleAlign: "center",
                        presentation: "modal",
                        headerTitle: () => <HeaderTitle />,
                        headerLeft: () => ChatHeaderLeft({ navigation }),
                        gestureDirection: "horizontal",
                      })}
                    />
                    <Stack.Screen
                      name="ImageScreen"
                      component={ImageScreen}
                      options={({ navigation }) => ({
                        headerTitleAlign: "center",
                        headerTitle: () => <HeaderTitle />,
                        headerLeft: () => imageHeaderLeft({ navigation }),
                        presentation: "modal",
                        gestureDirection: "horizontal",
                      })}
                    />

                    <Stack.Screen
                      name="Subscription"
                      component={Subscription}
                      options={({ navigation }) => ({
                        headerTitle: "Try Pro for Free",
                        headerTintColor: "#FFFFFF",
                        headerStyle: styles.headerStyle,
                        headerTitleStyle: styles.onboardingHeader,
                        headerLeft: null,
                        cardStyleInterpolator:
                          CardStyleInterpolators.forVerticalIOS,
                        headerRight: () => (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.goBack();
                              handleSaveChatButtonPress(chats, size, points);
                            }}
                          >
                            <Text style={styles.skipStyle}>Skip</Text>
                          </TouchableOpacity>
                        ),
                      })}
                    />
                  </>
                ) : (
                  <Stack.Screen
                    name="NewSubscription"
                    component={Subscription}
                    options={({ navigation }) => ({
                      headerTitle: "Try Pro for Free",
                      headerTintColor: "#FFFFFF",
                      headerStyle: styles.headerStyle,
                      headerTitleStyle: styles.onboardingHeader,
                      headerLeft: null,
                      cardStyleInterpolator:
                        CardStyleInterpolators.forVerticalIOS,
                    })}
                  />
                )}
              </Stack.Navigator>

              <PointsBottomSheet assetBottomSheet={assetBottomSheet} />

              <BottomSheet
                snapPoints={bssnapPoints}
                ref={bottomSheetModalRef}
                index={-1}
                enablePanDownToClose={true}
                handleStyle={{
                  backgroundColor: "#171717",
                  borderColor: "#171717",
                }}
                handleIndicatorStyle={{
                  backgroundColor: "rgba(100,100,100,0.6)",
                }}
              >
                <BottomSheetContent />
              </BottomSheet>
            </>
          ) : (
            <>
              <OnBoarding setFlag={setFlag} />
            </>
          )}
        </>
      ) : null}

      <CheckInternet
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
    </NavigationContainer>
  );
};
