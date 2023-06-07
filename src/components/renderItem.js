import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ToastAndroid,
  } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/COLORS";

const copyToClipboard = async (text) => {
  await Clipboard.setStringAsync(text);
  ToastAndroid.show("Copied to Clipboard", ToastAndroid.SHORT);
};

export default renderItem = ({ item }) =>

  item.sender === "user" ? (
    item.id === 1 ? (
      <>
        <View style={styles.firstChatItem}>
          <View style={styles.chatInner}>
            <Image
              source={require("../../assets/icons/user_avatar.png")}
              style={styles.avatar}
            />
            <Text style={styles.chatText}>{item.message}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButtonContainer}
            onPress={() => copyToClipboard(item.message)}
          >
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </>
    ) : (
      <>
        <View style={styles.chatItem}>
          <View style={styles.chatInner}>
            <Image
              source={require("../../assets/icons/user_avatar.png")}
              style={styles.avatar}
            />
            <Text style={styles.chatText}>{item.message}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyButtonContainer}
            onPress={() => copyToClipboard(item.message)}
          >
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  ) : item.sender === "ChatGPT" ? (
    <>
      <View style={[{ backgroundColor: "#171717" }, styles.chatItem]}>
        <View style={styles.chatInner}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.avatar}
          />
          <Text style={styles.chatText}>{item.message}</Text>
        </View>
        <TouchableOpacity
          style={styles.copyButtonContainer}
          onPress={() => copyToClipboard(item.message)}
        >
          <MaterialCommunityIcons
            name="content-copy"
            size={20}
            color={COLORS.white}
          />
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </>
  ) : null;

const styles = StyleSheet.create({
  chatItem: {
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  firstChatItem: {
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopColor: "#2a2a2a",
    borderWidth: 1,
  },
  chatInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 25,
    height: 25,
    aspectRatio: 1,
    marginRight: 8,
    alignSelf: "flex-start",
  },
  chatText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "JosefinSans-Medium",
    flexShrink: 1,
    textAlign: "auto",
  },
  copyButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center", // Aligns the button to the right side
    marginTop: 10, // Adjust the margin as needed
    borderColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    width: 70,
    height: 30,
  },
  copyButtonText: {
    marginLeft: 2,
    color: COLORS.white,
  },
});
