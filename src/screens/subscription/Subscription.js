import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { Button } from "react-native-paper";
import { useState } from "react";
import {
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addPoints } from "../../slices/pointsSlice";
import { ToastAndroid } from "react-native";
import { StatusBar } from "react-native";
import { handleSaveChatButtonPress } from "../../utilities/SaveData";
import * as InAppPurchases from "expo-in-app-purchases";

const rewarded = RewardedAd.createForAdRequest(
  "ca-app-pub-7133387510338737/3916203163",
  {
    requestNonPersonalizedAdsOnly: true,
  }
);

const Subscription = () => {
  const [status, setStatus] = useState(2);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const points = useSelector((state) => state.pointsSlice.points);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
        dispatch(addPoints({ value: 5 }));
        handleSaveChatButtonPress(null, null, points + 5);
        setLoaded(false);
        ToastAndroid.show("5 wishes Awarded", ToastAndroid.SHORT);
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const SubTitle = ({ icon, text }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.subTitle}>{text}</Text>
      </View>
    );
  };

  const CustomButton = ({ text, num }) => {
    return (
      <Button
        mode="outlined"
        style={styles.Button}
        labelStyle={{ color: COLORS.white }}
        contentStyle={{ alignSelf: "flex-start" }}
        buttonColor={status === num ? "green" : null}
        onPress={() => {
          setStatus(num);
        }}
      >
        {text}
      </Button>
    );
  };

  async function purchaseItem(item) {
    const { productId } = item;

    try {
      const { responseCode } = await InAppPurchases.purchaseItemAsync(
        productId
      );
      console.log(responseCode);
      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        console.log("smd");
        dispatch(addPoints({ value: 100000 }));
        handleSaveChatButtonPress(null, null, points + 100000);
      } else if (
        responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED
      ) {
        Alert.alert(
          "Subscription Canceled",
          "The subscription purchase was canceled by the user."
        );
      } else {
        Alert.alert(
          "Subscription Failed",
          "Failed to initiate the subscription purchase."
        );
      }

      // Assuming the rest of the function remains the same
      // ...
    } catch (err) {
      console.log(err);
    }
  }

  async function subscribe() {
    const itemID =
      status === 1
        ? "sheraaifirstweeklysubscription"
        : "sheraaifirstmonthlysubscription";

    try {
      await InAppPurchases.connectAsync()
        .then(() => console.log("connected to store"))
        .catch((error) => console.log(error));

      const { responseCode, results } = await InAppPurchases.getProductsAsync([
        itemID,
      ]).catch((error) => console.log(error));

      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        results.forEach(async (purchase) => {
          if (!purchase.acknowledged) {
            console.log(`Successfully purchased ${purchase.productId}`);
            // Process transaction here and unlock content...

            await purchaseItem(purchase);
            console.log(purchase);
            // Then when you're done
            await InAppPurchases.finishTransactionAsync(purchase, false)
              .then(console.log("Transaction Completed"))
              .catch((err) => console.log(err));
          }
        });
      } else if (
        responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED
      ) {
        console.log("User canceled the transaction");
      } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
        console.log(
          "User does not have permissions to buy but requested parental approval (iOS only)"
        );
      } else {
        console.warn(
          `Something went wrong with the purchase. Received errorCode ${errorCode}`
        );
      }

      await InAppPurchases.disconnectAsync();
    } catch (error) {
      console.log(error);
      await InAppPurchases.disconnectAsync();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={COLORS.black} />
      <Text style={styles.title}>GET ACCESS TO:</Text>
      <View style={styles.fishing}>
        <SubTitle text={"Unlimited Questions & Answers"} />
        <SubTitle text={"Higher Word Limit"} />
        <SubTitle text={"Most Advanced AI Model (ChatGPT & GPT-4)"} />
      </View>
      {!loaded ? (
        <>
          <ActivityIndicator
            size={"large"}
            style={{ marginTop: 20 }}
            color={COLORS.primary}
          />
          <Text style={{ color: COLORS.primary, textAlign: "center" }}>
            Ad is being loaded
          </Text>
        </>
      ) : null}
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button
          mode="outlined"
          style={styles.Button}
          labelStyle={{ color: COLORS.white }}
          disabled={loaded ? false : true}
          rippleColor={COLORS.primary}
          contentStyle={{ alignSelf: "flex-start" }}
          onPress={() => {
            loaded ? rewarded.show() : null;
          }}
        >
          {"Watch an Ad    (+5 wishes)"}
        </Button>
        <CustomButton text={"$3/week"} num={1} />
        <CustomButton text={"$10/month"} num={2} />
        <Button
          mode="contained"
          style={{
            marginHorizontal: 20,
            marginVertical: 8,
            paddingVertical: 3,
          }}
          buttonColor="white"
          labelStyle={{ color: COLORS.black, fontSize: 16 }}
          rippleColor={COLORS.primary}
          contentStyle={{ alignSelf: "center" }}
          onPress={subscribe}
        >
          {"Continue"}
        </Button>
      </View>
      <TouchableOpacity>
        <Text>Continue</Text>
      </TouchableOpacity>
      <Text>Secured with Google Play Store. Cancel anytime</Text>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  title: {
    color: COLORS.white,
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 20,
    fontFamily: "JosefinSans-Medium",
    color: "#ACACAE",
  },
  subTitle: {
    color: COLORS.white,
    fontFamily: "JosefinSans-Bold",
    marginVertical: 7,
  },
  fishing: {
    text: COLORS.white,
    marginHorizontal: 20,
    height: "25%",
    backgroundColor: "#1C1C1E",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 45,
  },
  Button: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
});
