import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";
import { Platform } from "react-native";
import MyComponent from "../../components/button";
import { useNavigation } from "@react-navigation/native";

export default YourAiAssistant = ({setFlag}) =>{
  //const navigation = useNavigation();

  const nextscreen = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Chat" }],
    // });
   setFlag(true)
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>
          Allow us To Send Notifications so you wouldn't miss Anything.
        </Text>
      </View>
      <View style={styles.iconimage}>
        <Image source={require("../../../assets/icons/notifications.png")} />
      </View>
      <View style={styles.buttonstyle}>
        <TouchableHighlight onPress={nextscreen}>
          <MyComponent />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textcontainer: {
    alignItems: "center",
    flex: 3,
    marginHorizontal:18
  },
  text: {
    alignSelf: "flex-start",
    //paddingLeft: "5%",
    paddingTop: 10,
    color: "white",
    fontSize: 16,
    color: "grey",
    fontFamily: "JosefinSans-Medium",
  },
  main: {
    flex: 1,
    backgroundColor: "black",
  },
  iconimage: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 18,
    paddingBottom: "20%",
  },
  buttonstyle: {
    alignSelf: "center",
    width: "98%",
    flex: 2,
    paddingBottom: "10%",
  },
});
