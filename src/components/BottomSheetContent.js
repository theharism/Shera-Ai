import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import BottomSheetComponent from "./BottomSheetComponent";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const BottomSheetContent = () => {
  return (
    <BottomSheetScrollView
      style={{
        flex: 1,
        backgroundColor: "#171717",
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
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Join Our Discord Server"
        iconname={require("../../assets/icons/discord.png")}
        bottom="false"
        top="false"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Follow Our Instagram"
        iconname={require("../../assets/icons/instagram.png")}
        bottom="false"
        top="false"
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

      <BottomSheetComponent
        bgcolor="black"
        title="Language"
        iconname="ios-language"
        bottom="false"
        top="true"
        icon="true"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Clear History"
        iconname="ios-trash-outline"
        bottom="false"
        top="false"
        icon="true"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Voice"
        iconname="ios-volume-medium"
        bottom="true"
        top="false"
        icon="true"
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
        SUPPORT
      </Text>

      <View
        style={{
          marginTop: "5%",
        }}
      />

      <BottomSheetComponent
        bgcolor="black"
        title="Help Us"
        iconname="help-circle"
        bottom="false"
        top="true"
        icon="true"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Restore Purchases"
        iconname="reload"
        bottom="false"
        top="false"
        icon="true"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Request A Feature"
        iconname="ios-help-buoy"
        bottom="true"
        top="false"
        icon="true"
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

      <BottomSheetComponent
        bgcolor="black"
        title="Rate Us"
        iconname="star"
        bottom="false"
        top="true"
        icon="true"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Share With Your Friends"
        iconname="ios-share-social-sharp"
        bottom="false"
        top="false"
        icon="true"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Terms Of Use"
        iconname="md-newspaper"
        bottom="false"
        top="false"
        icon="true"
      />
      <BottomSheetComponent
        bgcolor="black"
        title="Privacy Policy"
        iconname="md-shield"
        bottom="true"
        top="false"
        icon="true"
      />
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({});
export default BottomSheetContent;
