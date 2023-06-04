import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const RecentsHome = ({ navigation }) => {
  const chats = useSelector((state) => state.chatSlice.chats);
  const chatList = chats.map((chat) => ({ id: chat.id, title: chat.title }));

  const renderItem = ({ item }) => {
    const truncatedTitle =
      item.title.length > 42 ? item.title.substring(0, 43) + "..." : item.title;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen", { id: item.id })}
      >
        <View style={styles.chatItem}>
          <Text style={styles.chatTitle}>{truncatedTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default RecentsHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  chatItem: {
    width: "100%",
    height: 60,
    backgroundColor: "#171717",
    justifyContent: "flex-end",
    //alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
  },
  chatTitle: {
    fontSize: 16,
    //fontWeight: 'bold',
    //textAlign: 'center',
    color: COLORS.white,
    fontFamily: "JosefinSans-Medium",
  },
  list: {
    marginHorizontal: 15,
  },
});
