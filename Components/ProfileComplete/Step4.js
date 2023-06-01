import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
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
import { Chase } from "react-native-animated-spinkit";
const Step4 = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [animate, setAnimate] = useState(false);

  const getEmail = async () => {
    let email = JSON.parse(await AsyncStorage.getItem("email"));
    setUserEmail(email);
  };

  getEmail();

  function handleActivation() {
    setAnimate(!animate);
    const activateUser = () => {
      fetch(`http://localhost:4500/userActivated/${userEmail}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userActivated: "yes",
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          if (result.status == "success") {
            setAnimate(false);

            setTimeout(() => {
              navigation.navigate("mainScreen");
            }, 600);
            AsyncStorage.removeItem("email");
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    setTimeout(() => {
      activateUser();
    }, 5000);
  }

  return (
    <SafeAreaView>
      {animate ? (
        animate
      ) : (
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
            btnClick={handleActivation}
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
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default Step4;

const styles = StyleSheet.create({});
