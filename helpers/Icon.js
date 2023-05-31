import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const Icon = ({
  iconName,
  iconSize,
  iconColor,
  btnClick,
  bRadius,
  top,
  left,
  right,
  bottom,
  justify,
  align,
  bwidth,
  bgColor,
  ml,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      {/* <Pressable
        onPress={btnClick}
        style={{
          borderRadius: bRadius,
          borderWidth: bwidth,
          backgroundColor: bgColor,

          top: top,
          left: left,
          right: right,
          bottom: bottom,
          justifyContent: justify,
          alignItems: align,
        }}
      >
        <FontAwesome
          name={iconName}
          size={iconSize}
          color={iconColor}
          // onPress={btnClick}
        />
      </Pressable> */}
      <FontAwesome
        name={iconName}
        size={iconSize}
        color={iconColor}
        onPress={btnClick}
        style={{
          borderRadius: bRadius,
          borderWidth: bwidth,
          backgroundColor: bgColor,
          marginTop: ml,

          // top: top,
          // left: left,
          // right: right,
          // bottom: bottom,
          // justifyContent: justify,
          // alignItems: align,
        }}
      />
    </View>
  );
};

export default Icon;
