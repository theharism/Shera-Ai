import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import React from "react";

const PickAssets = ({ bgcolor, title }) => {
  const AssetType = () => {
    console.log(`Picking ${title}`);
  };
  return (
    <TouchableNativeFeedback onPress={AssetType}>
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
