import {
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/COLORS";
import CustomTextInput from "./CustomTextInput";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";

const ChatScreen = () => {
  const route = useRoute();
  const messageReceived = route.params?.message;
  
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [sendPressed, setSendPressed] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const flatListRef = useRef(null);

  useEffect(() => {
    if (messageReceived.length > 0) {
      setMessage(messageReceived)
      setSendPressed(true);
    }
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    // if (messages.length === 0) {
    //   dispatch(setChatTitle({ id: id, chatTitle: message }));
    // }

    //  setHeight(0);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        message: message.trimEnd(),
        sender: "user",
      },
    ]);

    setMessage("");
    setTyping(true);
    setSubmitted(true);
    setSendPressed(false);
  };

  if (sendPressed) {
    handleSendMessage();
  }

  const renderItem = ({ item }) =>
    item.sender == "user" ? (
      <View style={styles.chatItem}>
        <View style={styles.chatInner}>
          <Image
            source={require("../../assets/icons/user_avatar.png")}
            style={styles.avator}
          />
          <Text style={styles.chatText}>{item.message}</Text>
        </View>
      </View>
    ) : (
      <View
        style={[
          {
            backgroundColor: "#171717",
          },
          styles.chatItem,
        ]}
      >
        <View style={styles.chatInner}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.avator}
          />
          <Text style={styles.chatText}>{item.message}</Text>
        </View>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.innerContainer}>
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onLayout={() => {
              if (messages.length > 0) {
                flatListRef.current.scrollToEnd();
              }
            }}
            onContentSizeChange={() => {
              if (messages.length > 0) {
                flatListRef.current?.scrollToEnd();
              }
            }}
          />

          <CustomTextInput
            message={message}
            setMessage={setMessage}
            addShow={false}
            onPress={() => setSendPressed(true)}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chatContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginRight: 10,
    //marginHorizontal:10
  },
  textInput: {
    width: "100%",
    height: 60, // Set a fixed height for the text input container
  },
  chatItem: {
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  chatInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  avator: {
    width: 25,
    height: 25,
    aspectRatio: 1,
    marginRight: 8,
  },
  chatText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "JosefinSans-Medium",
  },
});
