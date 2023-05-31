import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { Fragment, useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { BLACK, ORANGE, WHITE } from "../helpers/Colors";
import CustomInput from "../helpers/CustomInput";
import Button from "../helpers/Button";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";

const ForgetPasswordStep2 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [animate, setAnimate] = useState(false);

  const sendEmail = () => {
    setAnimate(true);
    if (email === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "Email is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.1),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 300);
    } else {
      const sendCodeToEmail = async () => {
        let request = await fetch("http://localhost:4500/sendEmail", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
        let result = await request.json();

        if (result.status === "success") {
          setAnimate(!animate);
          setTimeout(() => {
            navigation.navigate("forgetPasswordStep3");
          }, 500);
          console.log(result.msg);
        } else if (result.status === "error") {
          console.log(result.msg);
          setTimeout(() => {
            setAnimate(false);
            showMessage({
              message: result.msg,
              type: "danger",
              icon: "auto",
              titleStyle: {
                fontSize: responsiveFontSize(1.8),
                textAlign: "center",
                padding: responsiveHeight(1.3),
              },
            });
          }, 300);
        }

        console.log(result);
      };

      // console.log(email);

      setTimeout(() => {
        sendCodeToEmail();
      }, 5000);
    }
  };
  return (
    <Fragment>
      <StatusBar barStyle={"light-content"} />
      {animate ? (
        animate
      ) : (
        <View
          style={{ backgroundColor: ORANGE, height: responsiveHeight(100) }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: responsiveHeight(30),
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2.7),
                color: WHITE,
                textAlign: "center",
              }}
            >
              Provide your registered Email to reset password
            </Text>

            <CustomInput
              placeholder={"Enter Email"}
              value={email}
              onchangeText={(text) => setEmail(text)}
              height={responsiveHeight(6)}
              placeholderTextColor={WHITE}
              textColor={WHITE}
              bcolor={WHITE}
              bRadius={responsiveWidth(2)}
              bdWdith={responsiveWidth(0.4)}
              width={responsiveWidth(90)}
              pl={responsiveWidth(5)}
              mt={responsiveHeight(7)}
            />

            <Button
              title={"Reset Password"}
              textColor={ORANGE}
              bgColor={WHITE}
              borderRadius={responsiveWidth(5)}
              width={responsiveWidth(70)}
              padding={responsiveHeight(2)}
              mt={responsiveHeight(10)}
              btnClick={() => {
                setTimeout(() => {
                  sendEmail();
                }, 100);
              }}
            />
          </View>
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
    </Fragment>
  );
};

export default ForgetPasswordStep2;

const styles = StyleSheet.create({});
