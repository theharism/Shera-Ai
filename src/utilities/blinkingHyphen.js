import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { COLORS } from "../constants/COLORS";

const BlinkingHyphen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 500); // Toggle visibility every 500ms

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <Text
      style={{
        opacity: isVisible ? 1 : 0,
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: 30,
      }}
    >
      -
    </Text>
  );
};

export default BlinkingHyphen;
