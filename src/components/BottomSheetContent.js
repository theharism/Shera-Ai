import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  Share,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import BottomSheetComponent from "./BottomSheetComponent";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { clearData } from "../slices/chatsSlice";

const windowHeight = Dimensions.get("window").height;

const BottomSheetContent = () => {
  const youtube = "https://www.youtube.com/Sheratokens";
  const telegram = "https://t.me/sheratokens";
  const twitter = "https://twitter.com/sheratokens";

  const help = "https://forms.gle/dAm3XNVcNDJDcyJPA";
  const newFeature = "https://forms.gle/GBgXxVR2sQqBEwEE6";
  const share =
    "https://play.google.com/store/apps/details?id=com.ai.chatgpt.sheraai.imagegenerator.aichat";
  const privacyPolicy = "https://itishstudios.net/privacy-policy/";

  const dispatch = useDispatch();

  const handleOpenLink = async (url) => {
    // Check if the link is supported on the device
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Open the link
      await Linking.openURL(url);
    } else {
      console.log("Cannot open the link.");
    }
  };

  const clearChats = async () => {
    try {
      await AsyncStorage.setItem("chats", "");
      await AsyncStorage.setItem("size", "");

      dispatch(clearData());

      ToastAndroid.show("Chats Deleted", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Shera Ai ! A Powerful Chat Bot And Ai Image Generator With Multilingual Support !.\n\n Shera Ai Is An Advanced Artificial Intelligence (Ai) System That Combines The Functionalities Of A Chat Bot And An Ai Image Generator. Designed To Provide An Immersive And Interactive User Experience, Shera Ai Leverages State-of-the-art Technology To Understand And Respond To User Queries And Generate High-quality Images Based On Specific Inputs. With Its Multilingual Support, Shera Ai Can Seamlessly Communicate With Users From Different Linguistic Backgrounds, Making It A Versatile Tool For Various Applications. \n\n ${share} `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <BottomSheetScrollView
      style={{
        flex: 1,
        backgroundColor: "#171717",
        height: windowHeight,
      }}
    >
      <View
        style={{
          marginTop: "5%",
        }}
      />
      <Text
        style={{
          fontSize: 17,
          color: "rgb(150,150,150)",
          marginLeft: "3%",
          fontWeight: "bold",
          fontFamily: "JosefinSans-Medium",
        }}
      >
        SOCIAL
      </Text>
      <View
        style={{
          marginTop: "4%",
        }}
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Follow Us On Twitter"
        iconname={require("../../assets/icons/twitter.png")}
        bottom="false"
        top="true"
        onPress={() => handleOpenLink(twitter)}
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Join Our Telegram Group"
        iconname={require("../../assets/icons/telegram.png")}
        bottom="false"
        top="false"
        onPress={() => handleOpenLink(telegram)}
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Subscribe our YouTube Channel"
        iconname={require("../../assets/icons/youtube.png")}
        bottom="false"
        top="false"
        onPress={() => handleOpenLink(youtube)}
      />

      <View
        style={{
          marginTop: "5%",
        }}
      />

      <Text
        style={{
          fontSize: 17,
          color: "rgb(150,150,150)",
          marginLeft: "3%",
          fontWeight: "bold",
          fontFamily: "JosefinSans-Medium",
        }}
      >
        SETTINGS
      </Text>

      <View
        style={{
          marginTop: "5%",
        }}
      />

      {/* <BottomSheetComponent
        bgcolor="black"
        title="Language"
        iconname="ios-language"
        bottom="false"
        top="true"
        icon="true"
      /> */}
      <BottomSheetComponent
        bgcolor="black"
        title="Clear History"
        iconname="ios-trash-outline"
        bottom="false"
        top="false"
        icon="true"
        onPress={clearChats}
      />
      {/* <BottomSheetComponent
        bgcolor="black"
        title="Voice"
        iconname="ios-volume-medium"
        bottom="true"
        top="false"
        icon="true"
      /> */}

      <View
        style={{
          marginTop: "5%",
        }}
      />

      <Text
        style={{
          fontSize: 17,
          color: "rgb(150,150,150)",
          marginLeft: "3%",
          fontWeight: "bold",
          fontFamily: "JosefinSans-Medium",
        }}
      >
        SUPPORT
      </Text>

      <View
        style={{
          marginTop: "5%",
        }}
      />

      <BottomSheetComponent
        bgcolor="black"
        title="Help"
        iconname="help-circle"
        bottom="false"
        top="true"
        icon="true"
        onPress={() => handleOpenLink(help)}
      />
      {/* <BottomSheetComponent
        bgcolor="black"
        title="Restore Purchases"
        iconname="reload"
        bottom="false"
        top="false"
        icon="true"
      /> */}
      <BottomSheetComponent
        bgcolor="black"
        title="Request A Feature"
        iconname="ios-help-buoy"
        bottom="true"
        top="false"
        icon="true"
        onPress={() => handleOpenLink(newFeature)}
      />
      <View
        style={{
          marginTop: "5%",
        }}
      />

      <Text
        style={{
          fontSize: 17,
          color: "rgb(150,150,150)",
          marginLeft: "3%",
          fontWeight: "bold",
          fontFamily: "JosefinSans-Medium",
        }}
      >
        ABOUT
      </Text>

      <View
        style={{
          marginTop: "5%",
        }}
      />

      {/* <BottomSheetComponent
        bgcolor="black"
        title="Rate Us"
        iconname="star"
        bottom="false"
        top="true"
        icon="true"
      /> */}

      <BottomSheetComponent
        bgcolor="black"
        title="Share With Your Friends"
        iconname="ios-share-social-sharp"
        bottom="false"
        top="false"
        icon="true"
        onPress={onShare}
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Terms Of Use"
        iconname="md-newspaper"
        bottom="false"
        top="false"
        icon="true"
        onPress={() => handleOpenLink(privacyPolicy)}
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Privacy Policy"
        iconname="md-shield"
        bottom="true"
        top="false"
        icon="true"
        onPress={() => () => handleOpenLink(privacyPolicy)}
      />
    </BottomSheetScrollView>
  );
};

export default BottomSheetContent;
