import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Fragment, useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { GRAY } from "../helpers/Colors";
import Button from "../helpers/Button";
import { WHITE } from "../helpers/Colors";
import { Chase } from "react-native-animated-spinkit";
import { ORANGE } from "../helpers/Colors";
import { LIGHT_BLACK } from "../helpers/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetPassword = ({ navigation }) => {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");

  const readData = async () => {
    const email = JSON.parse(await AsyncStorage.getItem("email"));
    setEmail(email);
  };

  readData();

  return (
    <Fragment>
      <SafeAreaView>
        {animate ? (
          animate
        ) : (
          <View>
            <Text
              style={{
                fontSize: responsiveFontSize(2.2),
                color: GRAY,
                textAlign: "center",
                paddingLeft: responsiveWidth(10),
                paddingRight: responsiveWidth(10),
                paddingTop: responsiveHeight(2),
              }}
            >
              Select which contact details should we use to reset your Password
            </Text>

            <Button
              title={"Via Email"}
              bgColor={GRAY}
              ml={responsiveWidth(10)}
              mr={responsiveWidth(10)}
              mt={responsiveHeight(5)}
              textColor={WHITE}
              borderRadius={responsiveWidth(10)}
              padding={responsiveHeight(2)}
              btnClick={() => {
                setAnimate(true);
                // delay 600 millisecond before navigating
                setTimeout(() => {
                  setAnimate(false);
                  navigation.navigate("forgetPasswordStep2");
                }, 600);
              }}
            />
            <Button
              title={"Via Phone ? Not Available"}
              bgColor={LIGHT_BLACK}
              ml={responsiveWidth(10)}
              mr={responsiveWidth(10)}
              mt={responsiveHeight(5)}
              textColor={WHITE}
              borderRadius={responsiveWidth(10)}
              padding={responsiveHeight(2)}
            />
          </View>
        )}
        <View style={{}}>
          <Chase
            size={100}
            color={ORANGE}
            animating={animate}
            style={{
              position: "absolute",
              top: responsiveHeight(40),
              right: responsiveWidth(40),
            }}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
