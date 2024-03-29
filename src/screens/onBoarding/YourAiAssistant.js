import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";
import MyComponent from "../../components/button";
import { COLORS } from "../../constants/COLORS";

const YourAiAssistant = ({ navigation }) => {
  const nextscreen = () => {
    navigation.navigate("HelpUsGrow");
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent={true} backgroundColor={COLORS.black} />
      <View style={styles.textcontainer}>
        <Text style={styles.text}>
          Enhance Productivity with Idea Generation, task automation, and fast
          information access
        </Text>
      </View>
      <View style={styles.iconimage}>
        <Image
          source={require("../../../assets/icon.png")}
          style={{ height: "100%", width: "100%", aspectRatio: 1 }}
        />
      </View>
      <View style={styles.buttonstyle}>
        <TouchableHighlight onPress={nextscreen}>
          <MyComponent />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textcontainer: {
    alignItems: "center",
    flex: 3,
    marginHorizontal: 20,
  },
  text: {
    alignSelf: "flex-start",

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

export default YourAiAssistant;
