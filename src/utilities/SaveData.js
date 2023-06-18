import AsyncStorage from "@react-native-async-storage/async-storage";

export async function handleSaveChatButtonPress(chats, size, points) {
  try {
    await AsyncStorage.setItem("chats", JSON.stringify(chats));
    await AsyncStorage.setItem("size", size.toString());
    await AsyncStorage.setItem("points", points.toString());

    console.log("Chat saved successfully!");
  } catch (error) {
    console.log("Error saving chat:", error);
  }
}
