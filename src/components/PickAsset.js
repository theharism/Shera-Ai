import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import TextRecognition from "react-native-text-recognition";
import * as MediaLibrary from "expo-media-library";

const PickAssets = ({ bgcolor, title }) => {
  const AssetType = () => {
    console.log(`Picking ${title}`);
  };

  //will be catered in next build

  // const PickReqAsset = () => {
  //   {
  //     title === "Camera"
  //       ? takeImage()
  //       : title === "Files"
  //       ? selectfile()
  //       : selectimage();
  //   }
  // };

  // const takeImage = async () => {};

  // const selectimage = () => {
  //   const [hasMLPermissions, setPermissions] = useState();
  //   const [photo, setPhoto] = useState();

  //   useEffect(() => {
  //     (async () => {
  //       const MediaLibraryPermissions =
  //         await MediaLibrary.getPermissionsAsync();
  //       setPermissions(MediaLibraryPermissions.status === "granted");
  //       console.log("Permission Granted");
  //     })();
  //   }, []);

  //   if (hasMLPermissions) {
  //     (async () => {
  //       const newPhoto = await MediaLibrary.getAssetsAsync();
  //       setPhoto(newPhoto);
  //     })();
  //   } else {
  //     setPhoto(undefined);
  //   }
  // };

  // const selectfile = () => {
  //   console.log("Selecting File");
  // };

  return (
    <Pressable
      onPress={AssetType}
      style={{
        backgroundColor: bgcolor,
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row-reverse",
        borderBottomColor: "rgb(200,200,200)",
      }}
      android_disableSound="true"
      android_ripple={{ color: "rgb(100,100,100)", foreground: "true" }}
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
    </Pressable>
  );
};

export default PickAssets;
