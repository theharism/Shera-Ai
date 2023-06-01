import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ChatHomeItem from "../../components/ChatHomeItem";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatHome = () => {
  const [message, setMessage] = useState("");
  const [height, setHeight] = useState(50);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          {/* Chat items */}
          <View style={styles.chatItems}>
            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
            />
            <ChatHomeItem
              title1='How do you say "How are you?" in Korean?'
              title2="Write a rap song lyrics about AI"
            />

            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
            />
            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
            />
            <ChatHomeItem
              title1='How do you say "How are you?" in Korean?'
              title2="Write a rap song lyrics about AI"
            />

            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
            />
          </View>
        </ScrollView>

        {/* Input section */}
        <View style={styles.messageInput}>
          <Ionicons name="add-circle-sharp" size={32} color="#c0c0c0" />
          <TextInput
            style={[
              styles.textInput,
              { height },
              scrollEnabled && styles.scrollEnabled,
            ]}
            multiline
            onContentSizeChange={handleContentSizeChange}
            placeholder="Write a message"
            placeholderTextColor={"#8e8d92"}
            numberOfLines={3}
            onChangeText={(text) => {
              setMessage(text.trimStart());
            }}
            value={message}
            scrollEnabled={scrollEnabled}
          />
          <TouchableOpacity style={styles.sendButton}>
            <FontAwesome name="send" size={24} color="#c0c0c0" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  chatItems: {
    paddingHorizontal: 10,
  },
  messageInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom:7
  },
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 3,
    borderColor: "#7f7f7f",
    borderWidth: 0.2,
    paddingHorizontal: 20,
    marginLeft: 10,
    minHeight: 60,
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Medium",
  },
  sendButton: {
    paddingVertical: 10,
    marginLeft: 15,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "JosefinSans-Medium",
  },
});
