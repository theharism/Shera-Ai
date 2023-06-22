import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/COLORS";
import CustomTextInput from "./CustomTextInput";
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { chatWithGPT3 } from "../Api/chatgpt";
import { addMessage, addChat } from "../slices/chatsSlice";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomString } from "../utilities/StringGenerator";
import { subtractPoints } from "../slices/pointsSlice";
import renderItem from "./renderItem";
import EventSource from "react-native-sse";
import "react-native-url-polyfill/auto";
import { handleSaveChatButtonPress } from "../utilities/SaveData";
import { StatusBar } from "react-native";

const ChatScreen = () => {
  const route = useRoute();
  const messageReceived = route.params?.message;
  const id = route.params?.id;
  const content = route.params?.content;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [sendPressed, setSendPressed] = useState(false);
  const [chatID, setChatID] = useState("");
  const [typing, setTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const flatListRef = useRef(null);
  const dispatch = useDispatch();

  const { chats, size } = useSelector((state) => state.chatSlice);
  const points = useSelector((state) => state.pointsSlice.points);

  useEffect(() => {
    const handleBackPress = () => {
      // Perform your custom logic here
      console.log("Hardware back button pressed!");

      handleSaveChatButtonPress(chats,size,points)

      // Return true to indicate that you've handled the event
      return false;
    };

    // Add the event listener for hardware back button press
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    // Clean up the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

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
        setChatID(id);
      }, []);
    }
  }

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

    dispatch(subtractPoints({ value: 1 }));

    if (messages.length === 0) {
      const newID = generateRandomString(10);
      const now = new Date();
      const dateString = now.toLocaleDateString();
      const timeString = now.toLocaleTimeString();
      date = dateString + " " + timeString;

      dispatch(
        addChat({
          id: newID,
          title: message,
          date,
        })
      );
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
          chatId: chatID,
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
    //const reply = await
    //chatWithGPT3(messages, content,setMessages);

    // if (reply) {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { id: prevMessages.length + 1, message: reply, sender: "ChatGPT" },
    //   ]);

    const OPENAI_KEY = "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";

    let newContent = "";

    if (content) {
      messages.unshift({ id: 0, message: content, sender: "system" });
    }

    let apiMessages = messages.map((messageObject) => {
      var role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else if (messageObject.sender === "user") {
        role = "user";
      } else {
        role = "system";
      }
      return { content: messageObject.message, role: role };
    });

    let url = "https://api.openai.com/v1/chat/completions";

    // Parameters to pass to the API
    let data = {
      model: "gpt-3.5-turbo",
      messages: apiMessages,
      temperature: 0.75,
      top_p: 0.95,
      max_tokens: 100,
      stream: true,
      n: 1,
      max_tokens: 200,
    };

    const es = new EventSource(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(data),
      pollingInterval: 25000,
    });

    const message = {
      id: messages.length + 1,
      message: "",
      sender: "ChatGPT",
    };

    setMessages((previousMessages) => [...previousMessages, message]);

    const listener = (event) => {
      if (event.type === "open") {
        console.log("Open SSE connection.");
      } else if (event.type === "message") {
        if (event.data !== "[DONE]") {
          // get every piece of text
          const data = JSON.parse(event.data);
          const delta = data.choices[0].delta;

          // Check if is the last text to close the events request
          const finish_reason = data.choices[0].finish_reason;

          if (finish_reason === "stop") {
            es.close();
          } else {
            if (delta && delta.content) {
              // Update content with new data
              newContent = newContent + delta.content;

              // Continuously update the last message in the state
              // with new piece of data
              setMessages((previousMessages) => {
                // Get the last array
                const last = [...previousMessages];

                // Update the list
                const mewLIst = last.map((m, i) => {
                  if (m.id === message.id) m.message = newContent;

                  return m;
                });
                // Return the new array
                return mewLIst;
              });
            }
          }
        } else {
          es.close();

          if (chatID) {
            dispatch(
              addMessage({
                chatId: chatID,
                id: message.id - 1,
                message: message.message,
                sender: message.sender,
              })
            );
          }
        }
      } else if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    };

    // Add listener
    es.addEventListener("open", listener);
    es.addEventListener("message", listener);
    es.addEventListener("error", listener);

    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  };

  useEffect(() => {
    if (sendPressed) {
      handleSendMessage();
    }
  }, [sendPressed]);

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar translucent={true} backgroundColor={COLORS.black}/>
      <KeyboardAvoidingView style={styles.innerContainer}>
        <View style={styles.chatContainer}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={(item) => renderItem(item)}
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
});
