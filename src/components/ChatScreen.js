import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/COLORS";
import CustomTextInput from "./CustomTextInput";
import { FlatList } from "react-native-gesture-handler";

const ChatScreen = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [sendPressed, setSendPressed] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const flatListRef = useRef(null);

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
      <View style={{ borderColor: COLORS.white, borderWidth: 2 }}>
        <Text style={{ color: COLORS.white, fontSize: 20 }}>
          {item.message}
        </Text>
      </View>
    ) : (
      <View></View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.innerContainer}>
        <View style={styles.chatContainer}>
          <View style={styles.chatContent}>
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
          </View>
       
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
  },
  chatContent: {
    // Add styles for your chat content here
  },
  textInput: {
    width: "100%",
    height: 60, // Set a fixed height for the text input container
  },
  
});
