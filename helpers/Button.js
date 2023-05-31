import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import Icon from "./Icon";
import { LIGHT_BLACK, ORANGE, WHITE } from "../helpers/Colors";

const Button = ({
  bgColor,
  top,
  width,
  padding,
  borderRadius,
  title,
  textColor,
  btnClick,
  showIcon,
  borderWidth,
  iconColor,
  align,
  ml,
  mr,
  mb,
  mt,
  pl,
  pr,
  pb,
  pt,
}) => {
  if (showIcon) {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: bgColor,
            flexDirection: "row",
            justifyContent: "space-between",

            top: top,
            width: width,
            padding: padding,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
            // top: rh(50),
            // width: rw(80),
            // padding: rw(4.5),
            // borderRadius: 22,
          }}
          onPress={btnClick}
        >
          <Text
            style={{ color: textColor, fontSize: rf(2.5), fontWeight: "bold" }}
          >
            {title}
          </Text>
          <Icon iconName={"forward"} iconColor={iconColor} iconSize={rf(3)} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: bgColor,
          flexDirection: "row",
          justifyContent: "center",

          top: top,
          width: width,
          padding: padding,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          marginLeft: ml,
          marginRight: mr,
          marginTop: mt,
          marginBottom: mb,
        }}
        onPress={btnClick}
      >
        <Text
          style={{
            color: textColor,
            fontSize: rf(2.5),
            fontWeight: "bold",
            textAlign: align,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
