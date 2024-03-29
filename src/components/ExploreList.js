import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const ExploreList = ({ title, data, navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemStyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatScreen", {content:item.content })}
        >
          <Image
            source={item.icon}
            style={{ width: 40, height: 40, aspectRatio: 1,borderRadius:10}}
          />
          <Text style={styles.itemTitleStyle}>{item.title}</Text>
          <Text style={styles.itemsubTitleStyle}>{item.subTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExploreList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  titleStyle: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 15,
    fontFamily:"GalanoGrotesqueBold"
  },
  itemStyle: {
    borderColor: "#292929",
    borderWidth: 2,
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    width: 170,
  },
  itemTitleStyle: {
    color: COLORS.white,
    fontSize: 14,
    marginVertical: 5,
    fontFamily: "GalanoGrotesqueBold",
  },
  itemsubTitleStyle: {
    color: "#7f7f7f",
    fontSize: 14,
    fontFamily: "JosefinSans-Medium",
  },
});
