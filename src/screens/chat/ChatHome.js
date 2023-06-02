import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ChatHomeItem from "../../components/ChatHomeItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import CustomTextInput from "../../components/CustomTextInput";

const ChatHome = ({ navigation }) => {
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          {/* Chat items */}
          <View style={styles.chatItems}>
            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
              setMessage={setMessage}
            />
            <ChatHomeItem
              title1='How do you say "How are you?" in Korean?'
              title2="Write a rap song lyrics about AI"
              setMessage={setMessage}
            />

            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
              setMessage={setMessage}
            />
            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
              setMessage={setMessage}
            />
            <ChatHomeItem
              title1='How do you say "How are you?" in Korean?'
              title2="Write a rap song lyrics about AI"
              setMessage={setMessage}
            />

            <ChatHomeItem
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
              setMessage={setMessage}
            />
          </View>
        </ScrollView>

        {/* Input section */}
        <CustomTextInput
          message={message}
          setMessage={setMessage}
          newChat={() => navigation.navigate("ChatScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  chatItems: {
    paddingHorizontal: 10,
  },
});
