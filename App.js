import "react-native-gesture-handler";
import "react-native-reanimated";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import chatSlice from "./src/slices/chatsSlice";
import pointsSlice from "./src/slices/pointsSlice";
import { PaperProvider } from "react-native-paper";

import Screens from "./src/Navigators/Screens";

const store = configureStore({
  reducer: {
    chatSlice,
    pointsSlice,
  },
});

import React, { useCallback, useRef, useMemo, useEffect,useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//import BottomSheetContent from "./src/components/BottomSheetContent";

import { GestureHandlerRootView } from "react-native-gesture-handler";

//import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function App() {
  // const bscontainerStyle = {
  //   color: "black",
  // };

  // const showBottomSheet = () => {
  //   console.log("Setbflag now true");
  //   setbFlag(true);
  //   bottomSheetModalRef.current?.snapToIndex(0);
  // };

  // const [bflag, setbFlag] = useState(false);

  // const bottomSheetModalRef = useRef(null);
  // const snapPoints = useMemo(() => ["99.9%"], []);

  // const handleSheetChanges = useCallback((index) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  return (
    <Provider store={store}>
    <PaperProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ height: "100%" }}>
       
              
        <Screens/>

              {/* <BottomSheets
                snapPoints={snapPoints}
                index="-1"
                bottomSheetModalRef={bottomSheetModalRef}
                handleSheetChanges={handleSheetChanges}
                enablePanDownToClose={true}
              >
                <View
                  style={{
                    backgroundColor: "black",
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                    }}
                  >
                    Awesome
                  </Text>
                </View>
              </BottomSheets> */}

              {/* <BottomSheet
                snapPoints={snapPoints}
                ref={bottomSheetModalRef}
                index={-1}
                onChange={handleSheetChanges}
                enableHandlePanningGesture={true}
                animateOnMount={true}
                enablePanDownToClose={true}
                topInset={StatusBar.currentHeight}
                handleStyle={{
                  backgroundColor: "rgba(1,1,1,0.95)",
                  borderColor: "rgba(1,1,1,0.95)",
                }}
                handleIndicatorStyle={{ backgroundColor: "gray" }}
              >
                <BottomSheetScrollView
                  contentContainerStyle={{
                    backgroundColor: "rgba(1,1,1,0.9)",
                    borderColor: "rgba(1,1,1,0.9)",
                  }}
                >
                  <BottomSheetContent />
                </BottomSheetScrollView>
              </BottomSheet>     */}
      </GestureHandlerRootView>
    </PaperProvider>
    </Provider>
  );
}