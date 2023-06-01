import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import { Content } from "../../constants/ExploreData";
import ExploreList from "../../components/ExploreList";
import { ScrollView } from "react-native-gesture-handler";

const ExploreHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Content" data={Content} />
          <ExploreList title="Content" data={Content} />
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
