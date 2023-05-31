import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Title = ({
  top,
  fontSize,
  fontWeight,
  title,
  left,
  right,
  bottom,
  color,
  btnClick,
  align,
}) => {
  if (btnClick) {
    return (
      <View>
        <TouchableOpacity onPress={btnClick}>
          <Text
            style={{
              top: top,
              fontSize: fontSize,
              fontWeight: fontWeight,
              left: left,
              right: right,
              bottom: bottom,
              color: color,
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <Text
        style={{
          top: top,
          fontSize: fontSize,
          fontWeight: fontWeight,
          left: left,
          right: right,
          bottom: bottom,
          color: color,
          textAlign: align,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({});
