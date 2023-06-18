import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";

const ChatHomeItem = ({
  title,
  icon,
  title1,
  title2,
  setMessage,
  leftStyle,
}) => {
  const CustomButton = ({ text }) => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {icon}
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton text={title1} />
        <CustomButton text={title2} />
      </View>
    </View>
  );
};

export default ChatHomeItem;

const styles = StyleSheet.create({
  container: {
    borderColor: "#1c1c1e",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingTop:10,
    backgroundColor: "#000000",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom:3
  },
  buttonContainer: {},
  button: {
    backgroundColor:'#1c1c1e',
    borderRadius:10,
    paddingHorizontal:8,
    paddingVertical:13,
    marginHorizontal:10,
    marginVertical:5
  },
  titleText: {
    fontSize: 17,
    color: "#7f7f7f",
    fontFamily: "JosefinSans-Bold",
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "JosefinSans-Medium",
  },
});
