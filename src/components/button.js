import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const onboardingButton = () => (
  <View style={styles.button}>
    <View style={styles.continue}>
      <Text style={styles.buttontext}>Continue</Text>
    </View>
    <View style={styles.nextbutton}>
      <Ionicons name="md-arrow-forward" color="black" size={30} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  continue: {
    backgroundColor: "white",
    alignSelf: "center",
    paddingRight: "26%",
    marginLeft: "38%"
  },
  button: {
    backgroundColor: "white",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    height: "110%",
    borderRadius: 40,
    marginHorizontal:10
  },
  buttontext: {
    fontSize: 22,
    fontFamily:'JosefinSans-Medium',
    
  },
  nextbutton: {},
});

export default onboardingButton;
