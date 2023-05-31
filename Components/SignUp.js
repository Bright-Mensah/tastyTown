import { StyleSheet, Text, View, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../helpers/Title";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomInput from "../helpers/CustomInput.js";
import Button from "../helpers/Button";
import { BLACK, LIGHT_BLACK, ORANGE, WHITE } from "../helpers/Colors";
import TextBelow from "../helpers/TextBelow";

import { Chase } from "react-native-animated-spinkit";
import { showMessage, hideMessage } from "react-native-flash-message";
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [animate, setAnimate] = useState(false);

  const handleSignUp = () => {
    setAnimate(!animate);
    if (email === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "Email is empty",
          type: "warning",
        });
      }, 300);
    } else if (password === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "Password is empty",
          type: "warning",
          icon: "warning",
        });
      }, 300);
    } else {
      const userSignUp = async () => {
        try {
          fetch("http://localhost:4500/signup", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((result) => {
              console.log(result);
              if (result.status === "success") {
                setAnimate(false);

                showMessage({
                  message: result.msg,
                  type: "success",
                  icon: "success",
                });

                setTimeout(() => {
                  navigation.navigate("signin");
                }, 3000);

                setEmail("");
                setPassword("");
              } else if (result.status === "warning") {
                setAnimate(false);

                showMessage({
                  message: result.msg,
                  type: "warning",
                  icon: "warning",
                });
              } else if (result.status === "error") {
                setAnimate(false);

                showMessage({
                  message: result.msg,
                  type: "warning",
                  icon: "warning",
                });
              }
            })
            .then(() => {})
            .catch((error) => {
              if (error.message === "Network request failed") {
                setTimeout(() => {
                  setAnimate(false);
                  showMessage({
                    message: "Check your internet access and try again!",
                    type: "danger",
                    icon: "danger",
                  });
                }, 300);
              }
            });
        } catch (error) {
          if (error.message === "Network request failed") {
            setTimeout(() => {
              setAnimate(false);
              showMessage({
                message: "Check your internet access and try again!",
                type: "danger",
                icon: "danger",
              });
            }, 300);
          }
        }
      };
      setTimeout(() => {
        userSignUp();
      }, 5000);
    }
  };

  return (
    <KeyboardAwareScrollView>
      {animate ? (
        animate
      ) : (
        <View>
          <Title
            title={"Sign Up"}
            top={responsiveScreenHeight(40)}
            left={responsiveScreenWidth(6)}
            fontSize={responsiveFontSize(3)}
            fontWeight={"bold"}
          />
          {/* email */}
          <View
            style={{
              top: responsiveScreenHeight(43.4),
              left: responsiveScreenWidth(6),
            }}
          >
            <Title title={"Email"} bottom={responsiveScreenHeight(1)} />
            <CustomInput
              placeholder={"You@gmail.com"}
              onchangeText={(e) => setEmail(e)}
              value={email}
              bdWdith={1}
              padding={responsiveScreenWidth(4)}
              bRadius={10}
              width={responsiveScreenWidth(86)}
              keyboardType={"email-address"}
            />
          </View>
          {/* password */}
          <View
            style={{
              top: responsiveScreenHeight(46.4),
              left: responsiveScreenWidth(6),
            }}
          >
            <Title title={"Password"} bottom={responsiveScreenHeight(1)} />
            <View>
              <CustomInput
                setIcon={true}
                placeholder={"********"}
                onchangeText={(e) => setPassword(e)}
                value={password}
                bdWdith={1}
                padding={responsiveScreenWidth(4)}
                bRadius={10}
                width={responsiveScreenWidth(86)}
                keyboardType={"email-address"}
                iconName={"eye"}
                iconSize={20}
                secureTextEntry={showPassword}
                btnClick={() => setShowPassword(!showPassword)}
              />
            </View>
          </View>

          {/* sign in button */}
          <Button
            title={"Sign up"}
            top={responsiveScreenHeight(51)}
            padding={responsiveScreenWidth(3)}
            bgColor={ORANGE}
            textColor={WHITE}
            align={"center"}
            ml={responsiveScreenWidth(10)}
            mr={responsiveScreenWidth(10)}
            borderRadius={10}
            btnClick={handleSignUp}
          />
          <TextBelow
            label={"Already have an account?  Sign in"}
            btnClick={() => navigation.navigate("signin")}
            top={responsiveScreenHeight(53)}
          />
          <TextBelow
            label={"By signing up you agree with our T&C and privacy policy"}
            top={responsiveScreenHeight(59)}
            btnClick={() => navigation.navigate("profileMain")}
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
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
