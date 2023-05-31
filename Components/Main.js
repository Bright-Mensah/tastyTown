import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from "react-native-responsive-dimensions";
import logo from "../assets/logo.png";
import Button from "../helpers/Button";

import { LIGHT_BLACK, ORANGE, WHITE } from "../helpers/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Title from "../helpers/Title";
LIGHT_BLACK;
const Main = ({ navigation }) => {
  // check if the user has  logged in  before
  useEffect(() => {
    const userLoggedInBefore = async () => {
      let result = JSON.parse(await AsyncStorage.getItem("loginYes"));
      if (result) {
        navigation.navigate("signin");
      }
    };
    userLoggedInBefore();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={logo} />

        {/* title */}

        <Title
          title={" Let's Start"}
          top={rh(40)}
          fontSize={rf(5)}
          fontWeight={"bold"}
        />
        {/* sign in button */}
        <Button
          title={"Sign in"}
          bgColor={ORANGE}
          textColor={WHITE}
          padding={rw(4.5)}
          width={rw(80)}
          top={rh(50)}
          borderRadius={22}
          showIcon={true}
          iconColor={WHITE}
          btnClick={() => navigation.navigate("signin")}
        />
        {/* sign up button */}
        <Button
          title={"Sign up"}
          top={rh(55)}
          width={rw(80)}
          showIcon={true}
          borderWidth={1}
          padding={rw(4.5)}
          borderRadius={22}
          btnClick={() => navigation.navigate("signup")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({});
