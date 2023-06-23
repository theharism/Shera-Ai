import { StyleSheet, Text, View } from "react-native";
import React,{useMemo} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';


import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/COLORS";

const PointsBottomSheet = ({assetBottomSheet}) => {

    const snapPoints = useMemo(() => ["30%"], []);
    const navigation = useNavigation();


  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      ref={assetBottomSheet}
      style={{ marginHorizontal: 3 }}
      backgroundStyle={{ backgroundColor: "#171717" }}
      handleStyle={{ backgroundColor: "#171717", borderRadius: 10 }}
      handleIndicatorStyle={{ backgroundColor: "rgb(200,200,200)" }}
    >
      <View style={{ alignItems: "center", flex: 1, marginTop: 10 }}>
        <Ionicons name="ios-information-circle" size={50} color="#FFFFFF" />
        <Text
          style={{
            color: COLORS.white,
            fontFamily: "JosefinSans-Medium",
            fontSize: 20,
            textAlign: "center",
            marginTop: 0,
            paddingHorizontal:5
          }}
        >
          Wishes function as the credit system for Shera Ai. One request to
          Shera deducts one wish from your balance.
        </Text>
        <Button
          mode="contained"
          style={{
            backgroundColor: "#40e6b4",
            marginTop: 30,
            paddingVertical: 0,
            width: "80%",
            height: 45,
          }}
          textColor={COLORS.black}
          labelStyle={{ fontSize: 17 }}
          onPress={() => {
            assetBottomSheet.current.close();
            navigation.navigate('Subscription')}}
        >
          Upgrade
        </Button>
      </View>
    </BottomSheet>
  );
};

export default PointsBottomSheet;

const styles = StyleSheet.create({});
