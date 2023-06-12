import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const BottomSheetComponent = ({ icon }) => (
  <View style={styles.button}>
    <View style={styles.continue}>
      <Text style={styles.buttontext}>Continue</Text>
    </View>
    <View style={styles.nextbutton}>
      <Ionicons name={icon} color="black" size={30} backgroundColor="red" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  continue: {
    backgroundColor: "black",
    alignSelf: "center",
    paddingRight: "26%",
    marginLeft: "38%",
  },
  button: {
    backgroundColor: "black",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    height: "110%",
    borderRadius: 40,
    marginHorizontal: 10,
    marginBottom: 40,
    flexDirection: "row-reverse",
    borderBottomColor: "red",
    borderBottomWidth: 5,
  },
  buttontext: {
    color: "white",
    fontSize: 22,
    fontFamily: "JosefinSans-Medium",
  },
  nextbutton: {},
});

export default BottomSheetComponent;
