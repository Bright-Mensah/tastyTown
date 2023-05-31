import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

const CustomInput = ({
  onchangeText,
  value,
  placeholder,
  keyboardType,
  placeholderTextColor,
  bdWdith,
  bcolor,
  bRadius,
  padding,
  width,
  height,
  secureTextEntry,
  setIcon,
  iconName,
  iconSize,
  iconColor,
  top,
  left,
  right,
  bottom,
  btnClick,
  Length,
  pl,
  pr,
  pb,
  pt,
  mt,
  textColor,
}) => {
  const scrollRef = useRef(null);
  if (setIcon) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{
            borderWidth: bdWdith,
            borderColor: bcolor,
            borderRadius: bRadius,
            padding: padding,
            width: width,
            height: height,
            top: top,
            left: left,
            bottom: bottom,
            right: right,
          }}
          onChangeText={onchangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderTextColor}
          autoComplete={"off"}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          onContentSizeChange={(e) => {
            if (scrollRef && scrollRef.current) {
              scrollRef.current?.scrollToEnd();
            }
          }}
        />
        <TouchableOpacity onPress={btnClick}>
          <FontAwesome
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={{
              right: responsiveScreenWidth(20),
              top: responsiveScreenHeight(1.4),
            }}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <TextInput
          style={{
            borderWidth: bdWdith,
            borderColor: bcolor,
            borderRadius: bRadius,
            padding: padding,
            width: width,
            height: height,
            top: top,
            left: left,
            bottom: bottom,
            right: right,
            paddingLeft: pl,
            paddingRight: pr,
            paddingTop: pt,
            paddingBottom: pb,
            color: textColor,
            marginTop: mt,
          }}
          onChangeText={onchangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderTextColor}
          autoComplete={"off"}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={Length}
          secureTextEntry={secureTextEntry}
          onContentSizeChange={(e) => {
            if (scrollRef && scrollRef.current) {
              scrollRef.current?.scrollToEnd();
            }
          }}
        />
      </View>
    );
  }
};

export default CustomInput;

const styles = StyleSheet.create({});
