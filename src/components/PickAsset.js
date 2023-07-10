import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import React from "react";
import DocumentPicker from "react-native-document-picker";
import { useState } from "react";
import { uploadToFirebase } from "../utilities/UploadImage";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

const PickAssets = ({
  bgcolor,
  title,
  assetBottomSheet,
  setLoadFile,
  loadFile,
}) => {
  const navigation = useNavigation();

  const AssetType = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type:
          title === "Files"
            ? DocumentPicker.types.allFiles
            : DocumentPicker.types.images,
      });
      setLoadFile(true);
      const response = await fetch(doc.uri);
      const blob = await response.blob();
      const url = await uploadToFirebase(blob, doc.name);
      navigation.navigate("ChatScreen", {
        specialCase: true,
        content: `Answer all questions with respect to this link ${url}`,
      });
      assetBottomSheet.current.close();
      setLoadFile(false);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableNativeFeedback
      onPress={AssetType}
      disabled={loadFile ? true : false}
    >
      <View
        style={{
          backgroundColor: bgcolor,
          width: "100%",
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row-reverse",
          borderBottomColor: "rgb(200,200,200)",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            alignSelf: "center",
            paddingLeft: 20,
            fontSize: 22,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            alignSelf: "center",
            marginLeft: "3%",
          }}
        >
          {title === "Camera" ? (
            <Image
              source={require("../../assets/icons/icon_camera.png")}
              style={{ resizeMode: "contain", flex: 1, width: 35 }}
            />
          ) : title === "Files" ? (
            <Image
              source={require("../../assets/icons/icon_files.png")}
              style={{ resizeMode: "contain", flex: 1, width: 35 }}
            />
          ) : (
            <Image
              source={require("../../assets/icons/icon_photos.png")}
              style={{ resizeMode: "contain", flex: 1, width: 35 }}
            />
          )}
        </View>
        {/* <Ionicons
        name={iconname}
        color="rgb(200,200,200)"
        style={{ alignSelf: "center", paddingLeft: "3%" }}
        size={33}
      /> */}
      </View>
    </TouchableNativeFeedback>
  );
};

export default PickAssets;
