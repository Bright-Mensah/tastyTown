import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const TextBelow = ({ label, btnClick, top }) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={btnClick}>
        <Text
          style={{
            textAlign: "center",
            fontSize: responsiveFontSize(1.5),
            top: top,
          }}
        >
          {label}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TextBelow;

const styles = StyleSheet.create({});
