import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import Title from "../../helpers/Title";
import { LIGHT_BLACK, ORANGE, WHITE } from "../../helpers/Colors";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import CustomInput from "../../helpers/CustomInput";
import * as Animatable from "react-native-animatable";
import Button from "../../helpers/Button";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";

const Step3 = ({ navigation }) => {
  const [animation, setAnimation] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [defaultAnimation, setDefaultAnimation] = useState("slideInDown");
  const [loading, setLoading] = useState("");

  const activatingAccount = () => {
    setDefaultAnimation("");
    setLoading(true);
    if (securityCode === "") {
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "security code  is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 800);
    } else if (securityCode.trim().length == 4) {
      setLoading(true);
      const checkCode = () => {
        fetch("http://localhost:4500/securityCode/", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            securityCode,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            // console.log(result);

            if (result.status === "success") {
              setLoading(false);

              showMessage({
                message: result.msg,
                type: "success",
                icon: "auto",
                titleStyle: {
                  fontSize: responsiveFontSize(2.2),
                  textAlign: "center",
                  padding: responsiveHeight(1.3),
                },
              });
              setTimeout(() => {
                setAnimation("fadeOutUpBig");
              }, 2000);

              setTimeout(() => {
                navigation.navigate("ProfileStep4");
              }, 4000);
            } else if (result.status === "incorrect") {
              setLoading(false);

              showMessage({
                message: result.msg,
                type: "danger",
                icon: "auto",
                titleStyle: {
                  fontSize: responsiveFontSize(2.2),
                  textAlign: "center",
                  padding: responsiveHeight(1.3),
                },
              });
            }
          });
      };
      setTimeout(() => {
        checkCode();
      }, 5000);
    }
  };

  return (
    <SafeAreaView>
      {loading ? (
        loading
      ) : (
        <Animatable.View
          animation={animation ? animation : defaultAnimation}
          duration={1500}
        >
          <View style={{ alignItems: "center" }}>
            <Title
              title={"Enter your Security code"}
              color={LIGHT_BLACK}
              fontWeight={"bold"}
              fontSize={responsiveFontSize(3)}
              top={responsiveHeight(4)}
              left={responsiveWidth(5)}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/OTP.png")}
              style={{ marginTop: responsiveHeight(14) }}
            />
            <Title
              title={
                "Enter the security code you provided earlier to activate your account"
              }
              top={responsiveHeight(8)}
              fontSize={responsiveFontSize(2.2)}
            />

            <CustomInput
              placeholder={"Enter Security Code"}
              placeholderTextColor={LIGHT_BLACK}
              top={responsiveHeight(20)}
              bdWdith={1}
              padding={responsiveWidth(4)}
              width={responsiveWidth(80)}
              bRadius={10}
              bcolor={ORANGE}
              Length={4}
              keyboardType={"number-pad"}
              onchangeText={(text) => setSecurityCode(text)}
              value={securityCode}
            />

            <Button
              title={"Verfiy"}
              top={responsiveHeight(25)}
              bgColor={ORANGE}
              textColor={WHITE}
              width={responsiveWidth(50)}
              padding={responsiveHeight(1.2)}
              borderRadius={17}
              btnClick={activatingAccount}
            />
          </View>
          <StatusBar barStyle={"dark-content"} />
        </Animatable.View>
      )}
      <View style={{}}>
        <Chase
          size={100}
          color={ORANGE}
          animating={loading}
          style={{
            position: "absolute",
            top: responsiveHeight(40),
            right: responsiveWidth(40),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Step3;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
