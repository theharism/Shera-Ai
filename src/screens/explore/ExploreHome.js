import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import { Artist, Business, Code, Content, Email, Entertainment, Food, Personal, Social } from "../../constants/ExploreData";
import ExploreList from "../../components/ExploreList";
import { ScrollView } from "react-native-gesture-handler";

const ExploreHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Artist" data={Artist} />
          <ExploreList title="Business" data={Business} />
          <ExploreList title="Personal" data={Personal} />
          <ExploreList title="Email" data={Email} />
          <ExploreList title="Social" data={Social} />
          <ExploreList title="Code" data={Code} />
          <ExploreList title="Food" data={Food} />
          <ExploreList title="Entertainment" data={Entertainment} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
