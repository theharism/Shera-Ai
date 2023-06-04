import { StyleSheet, Text, View, TouchableOpacity,TextInput } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/COLORS";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CustomTextInput = ({message,setMessage,onPress,addShow}) => {
  const [height, setHeight] = useState(50);
  //const [message, setMessage] = useState("");
  const maxHeight = 140;
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const handleContentSizeChange = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    if (contentHeight >= maxHeight) {
      setHeight(maxHeight);
      setScrollEnabled(true);
    } else {
      setHeight(contentHeight);
      setScrollEnabled(false);
    }
  };

  return (
    <View style={[ {paddingHorizontal: addShow ? 20 : 5 },styles.messageInput]}>
      {addShow ? <Ionicons name="add-circle-sharp" size={32} color="#c0c0c0" /> : null}
      <TextInput
        style={[
          styles.textInput,
          { height },
          scrollEnabled && styles.scrollEnabled,
        ]}
        multiline
        onContentSizeChange={handleContentSizeChange}
        placeholder="Write a message"
        placeholderTextColor={COLORS.primary}
        numberOfLines={3}
        onChangeText={(text) => {
          setMessage(text.trimStart());
        }}
        value={message}
        scrollEnabled={scrollEnabled}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onPress}>
        <FontAwesome name="send" size={24} color="#c0c0c0" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  messageInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.black,
    paddingVertical: 5,
    marginBottom: 7,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 3,
    borderColor: "#7f7f7f",
    borderWidth: 0.2,
    paddingHorizontal: 10,
    marginLeft: 10,
    minHeight: 60,
    color: COLORS.white,
    fontSize: 17,
    fontFamily: "JosefinSans-Medium",
  },
  sendButton: {
    paddingVertical: 10,
    marginLeft: 15,
  },
});
