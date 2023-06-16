import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { Button } from "react-native-paper";
import { useState } from "react";

const Subscription = () => {
  const [status, setStatus] = useState(2);

  const SubTitle = ({ icon, text }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.subTitle}>{text}</Text>
      </View>
    );
  };

  const CustomButton = ({ text, num }) => {
    return (
      <Button
        mode="outlined"
        style={styles.Button}
        labelStyle={{ color: COLORS.white }}
        contentStyle={{ alignSelf: "flex-start" }}
        buttonColor={status === num ? "green" : null}
        onPress={() => {
          setStatus(num);
        }}
      >
        {text}
      </Button>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GET ACCESS TO:</Text>
      <View style={styles.fishing}>
        <SubTitle text={"Unlimited Questions & Answers"} />
        <SubTitle text={"Higher Word Limit"} />
        <SubTitle text={"Most Advanced AI Model (ChatGPT & GPT-4)"} />
        <SubTitle text={"Try 3 Days for Free"} />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <CustomButton text={"$2250.0/week"} num={1} />
        <CustomButton text={"3 days for free, then s12800.0/year"} num={2} />
      </View>
      <TouchableOpacity>
        <Text>Continue</Text>
      </TouchableOpacity>
      <Text>Secured with Google Play Store. Cancel anytime</Text>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  title: {
    color: COLORS.white,
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 20,
    fontFamily: "JosefinSans-Medium",
    color: "#ACACAE",
  },
  subTitle: {
    color: COLORS.white,
    fontFamily: "JosefinSans-Bold",
    marginVertical: 7,
  },
  fishing: {
    text: COLORS.white,
    marginHorizontal: 20,
    height: "25%",
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 45,
  },
  Button: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
});