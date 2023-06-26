import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/COLORS";
import {
  Artist,
  Business,
  Code,
  Content,
  Email,
  Entertainment,
  Food,
  Personal,
  Social,
} from "../../constants/ExploreData";
import ExploreList from "../../components/ExploreList";
import { ScrollView } from "react-native-gesture-handler";
import ImageGenerator from "../../components/ImageGenerator";
import { StatusBar } from "react-native";

const ExploreHome = (props) => {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar translucent={true} backgroundColor={COLORS.black}/>
      <View style={styles.container}>
        <ScrollView>
          <ImageGenerator {...props} />
          <ExploreList title="Content" data={Content} {...props} />
          <ExploreList title="Artist" data={Artist} {...props} />
          <ExploreList title="Business" data={Business} {...props} />
          <ExploreList title="Personal" data={Personal} {...props} />
          <ExploreList title="Email" data={Email} {...props} />
          <ExploreList title="Social" data={Social} {...props} />
          <ExploreList title="Code" data={Code} {...props} />
          <ExploreList title="Food" data={Food} {...props} />
          <ExploreList title="Entertainment" data={Entertainment} {...props} />
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
