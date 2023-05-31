import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import ChatHomeItem from "../../components/ChatHomeItem";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <ChatHomeItem
            title1="Write a poem about floers and love"
            title2="Write a rap song lyrics about AI"
          />
          <ChatHomeItem
            title1='How do you say "How are you?" in Korean?'
            title2="Write a rap song lyrics about AI"
          />

          <ChatHomeItem
            title1="Write a poem about floers and love"
            title2="Write a rap song lyrics about AI"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
