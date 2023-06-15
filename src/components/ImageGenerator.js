import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { TouchableOpacity } from "react-native-gesture-handler";

const ImageGenerator = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>AI Image Generator</Text>
      <View style={styles.itemStyle}>
        <TouchableOpacity onPress={() => navigation.navigate("ImageScreen")}>
          <Image
            source={require("../../assets/icons/AI_art.png")}
            style={{
              width: "100%",
              height: "100%",
              borderRadius:10,
              // borderColor: COLORS.white,
              // borderWidth: 1,
            }}
          />

          {/* <Text style={styles.itemsubTitleStyle}>Generator Ai Images</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageGenerator;

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
    width: "100%",
    height: 180,
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
