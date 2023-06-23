import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, {
  useState,
  useMemo,
  useRef,
} from "react";
import { COLORS } from "../constants/COLORS";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5 } from "@expo/vector-icons";
import PickAssets from "./PickAsset";
import { MaterialIcons } from "@expo/vector-icons";

const CustomTextInput = ({ message, setMessage, onPress, addShow }) => {
  const [height, setHeight] = useState(50);
  const snapPoints = useMemo(() => ["40%"], []);
  const maxHeight = 140;
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const handleContentSizeChange = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    if (contentHeight >= maxHeight) {
      setHeight(maxHeight);
      setScrollEnabled(true);
    } else {
      setHeight(contentHeight);
      setScrollEnabled(false);
    }
  };

  const PickAsset = () => {
    assetBottomSheet.current?.snapToIndex(0);
  };
  const assetBottomSheet = useRef(null);

  return (
    <>
      <View
        style={[{ paddingHorizontal: addShow ? 20 : 5 }, styles.messageInput]}
      >
        {addShow ? (
          <Ionicons
            name="add-circle-sharp"
            size={32}
            color="#c0c0c0"
            onPress={PickAsset}
          />
        ) : null}
        {isLoading ? (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setLoading(false)}
          >
            <FontAwesome5 name="trash" size={24} color="#c0c0c0" />
          </TouchableOpacity>
        ) : null}
        <TextInput
          style={[
            styles.textInput,
            { height },
            scrollEnabled && styles.scrollEnabled,
          ]}
          multiline
          onContentSizeChange={handleContentSizeChange}
          placeholder="Write a message"
          placeholderTextColor={COLORS.primary}
          numberOfLines={3}
          onChangeText={(text) => {
            setMessage(text.trimStart());
          }}
          value={message}
          scrollEnabled={scrollEnabled}
        />

        {isLoading ? (
          <TouchableOpacity onPress={stopRecording}>
            <MaterialIcons
              name="pause-circle-outline"
              size={36}
              color="red"
              style={{ margin: 5 }}
            />
          </TouchableOpacity>
        ) : null}

        {/* {message.length > 0 || isLoading ? (
          <TouchableOpacity
            style={[styles.sendButton, isLoading ? null : { marginLeft: 10 }]}
            onPress={onPress}
          >
            <FontAwesome name="send" size={24} color="#c0c0c0" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.sendButton1}
           onPress={startRecording}
          >
            <Ionicons name="ios-mic" size={30} color="#c0c0c0" />
          </TouchableOpacity>
        )} */}

        <TouchableOpacity
          style={[styles.sendButton, isLoading ? null : { marginLeft: 10 }]}
          onPress={ message.length > 0 ? onPress : null }
        >
          <FontAwesome name="send" size={24} color="#c0c0c0" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={-1}
        ref={assetBottomSheet}
        backgroundColor="white"
        handleStyle={{ backgroundColor: "#171717" }}
        handleIndicatorStyle={{ backgroundColor: "rgb(200,200,200)" }}
      >
        <View style={{ justifyContent: "center", flex: 1 }}>
          <PickAssets bgcolor="#171717" title="Camera" />
          <PickAssets bgcolor="#171717" title="Photos" />
          <PickAssets bgcolor="#171717" title="Files" />
        </View>
      </BottomSheet>
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  messageInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.black,
    paddingVertical: 5,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 3,
    borderColor: "#7f7f7f",
    borderWidth: 0.2,
    paddingHorizontal: 10,
    marginLeft: 15,
    minHeight: 60,
    color: COLORS.white,
    fontSize: 17,
    fontFamily: "JosefinSans-Medium",
  },
  sendButton: {
    paddingVertical: 20,
    marginRight: 15,
  },
  sendButton1: {
    paddingVertical: 15,
    margin: 15,
  },
});
