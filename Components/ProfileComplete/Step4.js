import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import Title from "../../helpers/Title";
import { BLACK, LIGHT_BLACK, ORANGE, WHITE } from "../../helpers/Colors";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import CustomInput from "../../helpers/CustomInput";
import Button from "../../helpers/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Step4 = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/tick.png")}
          style={{ marginTop: responsiveHeight(10) }}
        />
        <Title
          title={"Congratulations"}
          top={responsiveHeight(4)}
          fontSize={responsiveFontSize(2.5)}
          fontWeight={"bold"}
        />

        <Title
          title={"You have successfully activated your profile!"}
          top={responsiveHeight(8)}
          fontSize={responsiveFontSize(2.2)}
          align={"center"}
        />

        <Button
          title={"Order Now"}
          bgColor={BLACK}
          textColor={WHITE}
          top={responsiveHeight(30)}
          borderRadius={20}
          width={responsiveWidth(80)}
          padding={responsiveWidth(5)}
          btnClick={() => {
            AsyncStorage.setItem("activated", JSON.stringify("yes"));
            navigation.navigate("home");
          }}
        />
      </View>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default Step4;

const styles = StyleSheet.create({});
