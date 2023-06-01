import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";

const Settings = () => {
  const { height, width, fontScale } = useWindowDimensions();

  return (
    <View>
      <Text style={{ fontSize: fontScale * 40 }}>Hello world</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
