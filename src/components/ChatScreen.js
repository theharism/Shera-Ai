import {
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/COLORS";
import CustomTextInput from "./CustomTextInput";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { chatWithGPT3 } from "../Api/chatgpt";
import { addMessage, addChat, getChatMessages } from "../slices/chatsSlice";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "../utilities/StringGenerator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

const ChatScreen = () => {
  const route = useRoute();
  const messageReceived = route.params?.message;
  const id = route.params?.id;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [sendPressed, setSendPressed] = useState(false);
  const [chatID, setChatID] = useState("");
  const [typing, setTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const flatListRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSubmitted(false);
  }, [message]);

  useEffect(() => {
    if (messageReceived) {
      setMessage(messageReceived);
      setSendPressed(true);
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      handleResponseMessage();
    }
  }, [submitted]);

  let messagesArray = [];

  if (id) {
    messagesArray = useSelector(
      (state) =>
        state.chatSlice.chats.find((chat) => chat.id === id)?.messages || []
    );
    if (messagesArray) {
      useEffect(() => {
        setMessages(messagesArray);
      }, []);
    }
  }

  // useEffect(() => {
  //   if (messagesArray) {
  //     setMessages(messagesArray);
  //   }
  // }, [messagesArray]);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show('Copied to Clipboard',ToastAndroid.SHORT)
  };

  const handleSetChatId = (id) => {
    return new Promise((resolve) => {
      setChatID(id);
      resolve(id);
    });
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    if (messages.length === 0) {
      const newID = generateRandomString(10);
      dispatch(addChat({ id: newID, title: message }));
      const newid = await handleSetChatId(newID);
      dispatch(
        addMessage({
          chatId: newID,
          id: messages.length,
          message: message.trimEnd(),
          sender: "user",
        })
      );
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        message: message.trimEnd(),
        sender: "user",
      },
    ]);

    if (chatID) {
      dispatch(
        addMessage({
          chatId: id,
          id: messages.length,
          message: message.trimEnd(),
          sender: "user",
        })
      );
    }

    setMessage("");
    setTyping(true);
    setSubmitted(true);
    setSendPressed(false);
  };

  const handleResponseMessage = async () => {
    const reply = await chatWithGPT3(messages);

    if (reply) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, message: reply, sender: "ChatGPT" },
      ]);

      if (chatID) {
        dispatch(
          addMessage({
            chatId: chatID,
            id: messages.length,
            message: reply,
            sender: "ChatGPT",
          })
        );
      }
    }
    setTyping(false);
  };

  useEffect(() => {
    if (sendPressed) {
      handleSendMessage();
    }
  }, [sendPressed]);

  const renderItem = ({ item }) =>
    item.sender === "user" ? (
      item.id === 1 ? (
        <>
          <View style={styles.firstChatItem}>
            <View style={styles.chatInner}>
              <Image
                source={require("../../assets/icons/user_avatar.png")}
                style={styles.avatar}
              />
              <Text style={styles.chatText}>{item.message}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButtonContainer}
              onPress={() => copyToClipboard(item.message)}
            >
              <MaterialCommunityIcons
                name="content-copy"
                size={24}
                color={COLORS.white}
              />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.chatItem}>
            <View style={styles.chatInner}>
              <Image
                source={require("../../assets/icons/user_avatar.png")}
                style={styles.avatar}
              />
              <Text style={styles.chatText}>{item.message}</Text>
            </View>
            <TouchableOpacity
              style={styles.copyButtonContainer}
              onPress={() => copyToClipboard(item.message)}
            >
              <MaterialCommunityIcons
                name="content-copy"
                size={24}
                color={COLORS.white}
              />
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
            <View style={styles.copyButtonContainer}>
              <MaterialCommunityIcons
                name="content-copy"
                size={24}
                color={COLORS.white}
              />
              <Text style={styles.copyButtonText}>Copy</Text>
            </View>
          </View>
        </>
      )
    ) : (
      <>
        <View style={[{ backgroundColor: "#171717" }, styles.chatItem]}>
          <View style={styles.chatInner}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.avatar}
            />
            <Text style={styles.chatText}>{item.message}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButtonContainer}
            onPress={() => copyToClipboard(item.message)}
          >
            <MaterialCommunityIcons
              name="content-copy"
              size={24}
              color={COLORS.white}
            />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </>
    );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.innerContainer}>
        <View style={styles.chatContainer}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
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
  textInput: {
    width: "100%",
    height: 60,
  },
  chatItem: {
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  firstChatItem: {
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopColor: "#2a2a2a",
    borderWidth: 1,
  },
  chatInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 25,
    height: 25,
    aspectRatio: 1,
    marginRight: 8,
    alignSelf: "flex-start",
  },
  chatText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "JosefinSans-Medium",
    flexShrink: 1,
    textAlign: "auto",
  },
  copyButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Aligns the button to the right side
    marginTop: 5, // Adjust the margin as needed
  },
  copyButtonText: {
    marginLeft: 5,
    color: COLORS.white,
  },
});
