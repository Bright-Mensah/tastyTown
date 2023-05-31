import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomInput from "../helpers/CustomInput";
import { BLACK, GRAY, ORANGE, WHITE } from "../helpers/Colors";
import Button from "../helpers/Button";
import { StatusBar } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Chase } from "react-native-animated-spinkit";

const ForgetPasswordStep3 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [getDataFromEmail, setGetDataFromEmail] = useState("");
  const [code, setCode] = useState("");
  const [animate, setAnimate] = useState(false);
  const getEmail = async () => {
    const email = JSON.parse(await AsyncStorage.getItem("email"));
    setGetDataFromEmail(email);
    var str = email;
    var encryptedEmail = str.replace(/.(?=.{13,}$)/g, "*");
    setEmail(encryptedEmail);
  };

  getEmail();

  useEffect(() => {
    console.log("email is " + getDataFromEmail);
  });

  function checkCode() {
    // check if the code is empty
    setAnimate(!animate);
    if (code === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "Code is empty",
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
      const verifyCode = async function () {
        let request = await fetch(
          `http://localhost:4500/user/${getDataFromEmail}`,
          {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        let result = await request.json();

        console.log(result);

        if (result.status == "success") {
          setAnimate(false);
          setTimeout(() => {
            showMessage({
              message: result.msg,
              type: "success",
              icon: "auto",
              titleStyle: {
                fontSize: responsiveFontSize(1.8),
                textAlign: "center",
                padding: responsiveHeight(1.3),
              },
            });
          }, 500);

          setTimeout(() => {
            navigation.navigate("resetPassword");
          }, 3000);

          console.log(result.msg);
        } else if (result.status === "error") {
          console.log(result.msg);
          setAnimate(false);
          setTimeout(() => {
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
      };

      setTimeout(() => {
        verifyCode();
      }, 5000);
    }
  }

  return (
    <Fragment>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView>
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
                marginTop: responsiveHeight(18),
              }}
            >
              <Text style={{ fontSize: responsiveFontSize(2.9), color: WHITE }}>
                Enter code that was sent to {email}
              </Text>

              <CustomInput
                placeholder={"Code"}
                value={code}
                onchangeText={(text) => setCode(text)}
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
                textColor={BLACK}
                bgColor={WHITE}
                borderRadius={responsiveWidth(5)}
                width={responsiveWidth(70)}
                padding={responsiveHeight(2)}
                mt={responsiveHeight(10)}
                btnClick={checkCode}
              />
            </View>
          </View>
        )}
        <View>
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

export default ForgetPasswordStep3;

const styles = StyleSheet.create({});
