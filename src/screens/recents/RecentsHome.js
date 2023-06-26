import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import {  useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { useAssets } from "expo-asset";

const RecentsHome = ({ navigation }) => {
  const chats = useSelector((state) => state.chatSlice.chats);
  const [assets, error] = useAssets([require("../../../assets/icon.png")]);

  const renderItem = ({ item }) => {
    const truncatedTitle =
      item.title.length > 42 ? item.title.substring(0, 43) + "..." : item.title;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ChatScreen", { id: item.id })}
      >
        <View style={styles.chatItem}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.chatTitle}>{truncatedTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={COLORS.black} />
      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={renderItem}
          style={styles.list}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Image
          source={require("../../../assets/animations/empty_history.gif")}
          style={{ width: 400, height: 400 }}
        />
      )}
    </SafeAreaView>
  );
};

export default RecentsHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  chatItem: {
    width: "100%",
    height: 60,
    backgroundColor: "#171717",
    justifyContent: "flex-end",
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
  },
  chatTitle: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: "JosefinSans-Medium",
  },
  list: {
    marginHorizontal: 15,
  },
  date: {
    color: COLORS.white,
    fontFamily: "JosefinSans-Regular",
  },
});
