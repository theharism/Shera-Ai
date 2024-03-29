import React, { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useDispatch } from "react-redux";
import { generateImage } from "../Api/HuggingFace";
import { Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Notifications from "expo-notifications";
import {  uploadToFirebase } from "../utilities/UploadImage";
import { COLORS } from "../constants/COLORS";
import { subtractPoints } from "../slices/pointsSlice";
import { setName } from "../slices/imagesSlice";

const ImageScreen = () => {
  const [imageURL, setImageURL] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const dispatch = useDispatch();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  async function showNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Download Complete",
        body: "Your image has been downloaded",
      },
      trigger: null,
    });
  }

  useEffect(() => {
    setImageName(`images/${new Date().getTime()}.jpg`);
  }, []);

  const handleGenerateImage = async () => {
    try {
      Keyboard.dismiss();
      dispatch(subtractPoints({ value: 1 }))
      setIsLoading(true);
      const blob = await generateImage(prompt);
      const imageUrl = await uploadToFirebase(blob, imageName);
      setImageURL(imageUrl);
      dispatch(setName(imageName))
      //const imageData = { prompt: prompt, url: imageUrl }
      //const id = await addNewImage(walletAddress, imageData)
      setIsLoading(false)
    } catch (error) {
      console.error("Image Error1" + error);
    }
  };

  const downloadImage = async (imageUrl) => {
    if (permissionResponse.status !== "granted") {
      requestPermission();
    }

    if (permissionResponse.status === "granted") {
      try {
        setIsDownloading(true);
        FileSystem.downloadAsync(
          imageUrl,
          FileSystem.documentDirectory + `${prompt}.jpg`
        )
          .then(async ({ uri }) => {
            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.createAlbumAsync(
              "Download",
              asset,
              false
            );
            await showNotification();
          })
          .catch((error) => {
            console.error(error);
          });
        //deleteFromFirebae(imageName);
        setIsDownloading(false);
      } catch (error) {
        setIsDownloading(false);
      }
    } else {
      console.log("Permission to save to media library not granted.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar translucent={true} backgroundColor={COLORS.black}/>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: "column" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <View style={styles.messageInput}>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="Type your message"
                placeholderTextColor={"white"}
                numberOfLines={3}
                onChangeText={(text) => {
                  setPrompt(text.trimStart());
                }}
                value={prompt}
              />
            </View>
            <View style={styles.sendButtonContainer}>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleGenerateImage}
              >
                <Text style={styles.sendButtonText}>Generate Image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color="#FFD700" style={[styles.loadingIndicator, { opacity: 1 }]} />
              )

                :
                (
              <>
                {imageURL && (
                  <>
                    <Image
                      source={{ uri: imageURL }}
                      style={{ width: "100%", aspectRatio: 1, marginTop: 50 }}
                    />
                    <TouchableOpacity
                      onPress={() => downloadImage(imageURL)}
                      style={{ position: "absolute", bottom: 50, right: 20 }}
                    >
                      <Entypo name="download" size={35} color="white" />
                    </TouchableOpacity>
                  </>
                )}
              </>
              )}
              {/* {
            isDownloading ? <ActivityIndicator size='large' color="#ffffff" style={[styles.loadingIndicator, { opacity: 1 }]} /> : null
          } */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <CheckInternet isConnected={isConnected} setIsConnected={setIsConnected} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  messageList: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  messageInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.black,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderColor: "#252934",
    borderWidth: 1,
    paddingHorizontal: 20,
    minHeight: 43,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "JosefinSans-Medium",
  },
  sendButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: "#d0021b",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "JosefinSans-Medium",
  },
  loadingIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    zIndex: 9999,
  },
  imageContainer: {
    flex: 1,
  },
});

export default ImageScreen;
