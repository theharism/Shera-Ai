import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { FlatList } from "react-native-gesture-handler";

const renderItem = ({ item }) => {
  return (
    <View style={styles.itemStyle}>
      <Image
        source={item.icon}
        style={{width:30,height:30,aspectRatio:1}}
      />
      <Text style={styles.itemTitleStyle}>{item.title}</Text>
      <Text style={styles.itemsubTitleStyle}>{item.subTitle}</Text>
    </View>
  );
};

const ExploreList = ({ title, data,icon }) => {
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
    //fontWeight:'bold',
    fontSize: 20,
    marginBottom: 15,
    fontFamily: "JosefinSans-Medium",
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
    fontSize: 16,
    marginVertical: 5,
    fontFamily: "JosefinSans-Medium",
  },
  itemsubTitleStyle: {
    color: "#7f7f7f",
    fontSize: 14,
    fontFamily: "JosefinSans-Medium",
  },
});
