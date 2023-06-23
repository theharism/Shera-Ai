import AsyncStorage from "@react-native-async-storage/async-storage";

export async function handleSaveChatButtonPress(chats, size, points) {
  try {

    if(chats)
    {
      await AsyncStorage.setItem("chats", JSON.stringify(chats));
    }
    if(size)
    {
      await AsyncStorage.setItem("size", size.toString());
    }
    if(points)
    {
      console.log("Chat saved!");
      await AsyncStorage.setItem("points", points.toString());
    }

    console.log("Chat saved successfully!");
  } catch (error) {
    console.log("Error saving chat:", error);
  }
}
