import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import Rive,{ Alignment, Fit } from "rive-react-native";

const RecentsHome = ({ navigation }) => {
  const chats = useSelector((state) => state.chatSlice.chats);
  //console.log(chats)
  //const chatList = chats.map((chat) => ({ id: chat.id, title: chat.title,date:chat.date }));

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
        // <Rive
        //   //url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
        //   //resourceName={""}
        //   resourceName="../../../assets/animations/main/no_internet.riv"
        //   style={{ width: 400, height: 400 }}
        // />
        <Rive
        autoplay={true}
        //url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
        resourceName="../../../assets/animations/main/2195-4346-avatar-pack-use-case (1)"
        style={{ width: 400, height: 400 }}
        onError={(err)=>console.error(err)}
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
  date: {
    color: COLORS.white,
    fontFamily: "JosefinSans-Regular",
  },
});
