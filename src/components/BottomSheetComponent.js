import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

const BottomSheetComponent = ({
  bgcolor,
  title,
  iconname,
  bottom,
  top,
  icon,
  onPress,
}) => {
  const AssetType = () => {
    console.log(`Picking ${title}`);
  };

  const Screen_Height = Dimensions.get("screen").height;

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: bgcolor,
        height: Screen_Height / 11,
        justifyContent: "flex-end",
        flexDirection: "row-reverse",
        borderBottomColor: "rgb(200,200,200)",
        marginRight: "2%",
        borderTopStartRadius: top === "true" ? 10 : 0,
        borderBottomEndRadius: bottom === "true" ? 10 : 0,
        borderBottomStartRadius: bottom === "true" ? 10 : 0,
        borderTopEndRadius: top === "true" ? 10 : 0,
      }}
      android_disableSound="true"
      android_ripple={{ color: "rgb(100,100,100)", foreground: "true" }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          paddingRight: "3%",
        }}
      >
        <Ionicons
          name="ios-chevron-forward"
          color="rgb(50,50,50)"
          style={{
            textAlign: "right",
            flexGrow: 1,
          }}
          size={22}
        />
      </View>

      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          alignSelf: "center",
          paddingLeft: 20,
          fontSize: 16,
          fontFamily: "JosefinSans-Medium",
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
        {icon === "true" ? (
          <Ionicons
            name={iconname}
            color="white"
            size={33}
            style={{ backgroundColor: "black", borderRadius: 8 }}
          />
        ) : (
          <Image
            source={iconname}
            style={{
              resizeMode: "contain",
              padding: 16,
              borderRadius: 8,
              backgroundColor: "black",
              height: "100%",
              width: "100%",
            }}
          />
        )}
      </View>
    </Pressable>
  );
};

export default BottomSheetComponent;
