import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import ChatHomeItem from "../../components/ChatHomeItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import CustomTextInput from "../../components/CustomTextInput";
import { StatusBar } from "react-native";

const ChatHome = ({ navigation }) => {
  const [message, setMessage] = useState("");

  const customStyle = {
    backgroundColor: 'red',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={COLORS.black}/>
      <View style={styles.container}>
        <ScrollView>
          {/* Chat items */}
          <View style={styles.chatItems}>
            <ChatHomeItem
              title="Explain"
              icon={
                <FontAwesome5 name="grip-lines" size={28} color="#7f7f7f" />
              }
              leftStyle={{position:'absolute',
              left:110,
              bottom:23 }}
              title1="Explain quantum physics"
              title2="What are wormholes explain like I am 5"
              setMessage={setMessage}
            />

            <ChatHomeItem
              title="Write & Edit"
              icon={<FontAwesome name="pencil" size={28} color="#7f7f7f" />}
              leftStyle={{position:'absolute',
              left:95,
              bottom:23 }}
              title1="Write a poem about flowers and love"
              title2="Write a rap song lyrics about AI"
              setMessage={setMessage}
            />
            <ChatHomeItem
              title="Translate"
              icon={
                <MaterialIcons name="translate" size={28} color="#7f7f7f" />
              }
              leftStyle={{position:'absolute',
              left:110,
              bottom:23 }}
              title1="How do you say 'How are you' in Korean?"
              title2="What does 'Vouloir,c'est pouvoir. ...' mean in English?"
              setMessage={setMessage}
            />
            <ChatHomeItem
              title="Write an Email"
              icon={
                <MaterialCommunityIcons
                  name="email-outline"
                  size={28}
                  color="#7f7f7f"
                />
              }
              leftStyle={{position:'absolute',
              left:85,
              bottom:23 }}
              title1="Write an email to reject client's offer because of the high price"
              title2="Write a reply for an email to accept meeting request"
              setMessage={setMessage}
            />
            <ChatHomeItem
              title="Get Recipes"
              icon={<Ionicons name="pizza" size={28} color="#7f7f7f" />}
              leftStyle={{position:'absolute',
              left:100,
              bottom:23 }}
              title1="How to make potato pancakes"
              title2="How to make pad thai"
              setMessage={setMessage}
            />

            <ChatHomeItem
              title="History"
              icon={<AntDesign name="book" size={28} color="#7f7f7f" />}
              leftStyle={{position:'absolute',
              left:120,
              bottom:23 }}
              title1="Where was santa born?"
              title2="How were the pyramids made?"
              setMessage={setMessage}
            />
            <ChatHomeItem
              title="Do Math"
              icon={
                <MaterialCommunityIcons
                  name="math-compass"
                  size={28}
                  color="#7f7f7f"
                />
              }
              leftStyle={{position:'absolute',
              left:115,
              bottom:23 }}
              title1="Solve this math problem: 3^(4)/3^(2)"
              title2="Act like a Math professor, how do they know pie is a transcendal number?"
              setMessage={setMessage}
            />

            <ChatHomeItem
              title="Social"
              icon={<Entypo name="share" size={28} color="#7f7f7f" />}
              leftStyle={{position:'absolute',
              left:125,
              bottom:23 }}
              title1="Write a funny tweet about cats"
              title2="Create a caption for my TickTok video about AI"
              setMessage={setMessage}
            />
          </View>
        </ScrollView>

        {/* Input section */}
        <CustomTextInput
          message={message}
          setMessage={setMessage}
          onPress={() => {
            navigation.navigate("ChatScreen", { message });
            setMessage("");
          }}
          addShow={false}
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
