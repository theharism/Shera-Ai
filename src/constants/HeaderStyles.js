import { StyleSheet,Image,View } from "react-native";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "./COLORS";

export const styles = StyleSheet.create({
    tabText: {
      fontSize: 12,
    },
    headerStyle: {
      backgroundColor: "#000000",
    },
    headerTitleStyle: {
      fontFamily: "JosefinSans-Medium",
      fontSize: 25,
      left: 5,
      bottom: 2,
      color:COLORS.white
    },
    chatHeader: {
      fontFamily: "JosefinSans-Medium",
      fontSize: 25,
      bottom: 2,
      alignSelf: "center",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    onboardingHeader: {
      fontFamily: "JosefinSans-Bold",
      fontSize: 25,
      bottom: 2,
    },
    container: {
      flex: 1,
      backgroundColor: "#000000",
    },
    modalContent: {
      backgroundColor: "#1c1c1e",
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "JosefinSans-Medium",
    },
    skipStyle:{
      color:COLORS.white,
      fontFamily:"JosefinSans-Medium",
      fontSize:17,
      marginRight:20
    }
  });

  export const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 300,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  export const FadeInView = (props) => {
    const SCREEN_WIDTH = Dimensions.get("window").width;
    const slideAnim = React.useRef(new Animated.Value(1)).current; // Initial value for slide: SCREEN_WIDTH
  
    useFocusEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.poly(1)),
        useNativeDriver: true,
      }).start();
      return () => {
        Animated.timing(slideAnim, {
          toValue: SCREEN_WIDTH,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.in(Easing.poly(1)),
        }).start();
      };
    });
  
    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, SCREEN_WIDTH],
                outputRange: [0, SCREEN_WIDTH],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        {props.children}
      </Animated.View>
    );
  };
  
  export const customHeaderLeft = () => (
    <Image
      source={require("../../assets/logo.png")}
      style={{ width: 40, height: 40, left:20, bottom: 2 }}
    />
  );
  
  export const customHeaderRight = ({showModal, points, }) => {

    return (

    <View style={{ flexDirection: "row" }}>
      <Button
        icon="star"
        mode="contained"
        textColor="#000000"
        compact="true"
        buttonColor="#40e6b4"
        onPress={showModal}
      >
        {points}
      </Button>
      <MaterialIcons
        name="account-circle"
        size={40}
        style={{ marginHorizontal: 10 }}
        color="#c0c0c0"
      />
    </View>
    )
  };