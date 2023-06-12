import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import BottomSheetComponent from "./BottomSheetComponent";

const BottomSheetContent = () => {
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  const renderItem = useCallback((item) => (
    <View key={item} style={styles.itemContainer}>
      <Text>{item}</Text>
    </View>
  ));
  return (
    <>
      <View style={styles.itemContainer}>
        <BottomSheetComponent icon="md-arrow-forward"></BottomSheetComponent>
      </View>
      <View style={styles.itemContainer}>
        <BottomSheetComponent icon="md-arrow-back"></BottomSheetComponent>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
    alignSelf: "center",
  },
});
export default BottomSheetContent;
