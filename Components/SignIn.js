import {
  StyleSheet,
  Text,
  View,
  Platform,
  LogBox,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../helpers/Title";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomInput from "../helpers/CustomInput.js";
import Button from "../helpers/Button";
import { BLACK, LIGHT_BLACK, ORANGE, WHITE } from "../helpers/Colors";
import Checkbox from "expo-checkbox";
import TextBelow from "../helpers/TextBelow";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {}, []);

  const handleSignIn = () => {
    setAnimate(!animate);

    // check if all the inputs are empty
    if (email === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "Email is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 300);
    } else if (password === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "Password is empty",
          type: "warning",
          icon: "warning",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 300);
    } else {
      // if all inputs are filled and not empty
      // go with the next step to login the user in
      const userLogin = async () => {
        // check if the user has activated the app

        console.log("not");

        fetch("http://localhost:4500/login", {
          method: "POST",
          headers: {
            Acccept: "application/json",
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
            // console.log(result);
            if (result.status === "success") {
              AsyncStorage.setItem("email", JSON.stringify(email));
              AsyncStorage.setItem("loginYes", JSON.stringify("yes"));

              setAnimate(false);

              showMessage({
                message: result.msg,
                type: "success",
                icon: "success",
              });

              // navigate to the profile step1 to complete your profile
              setTimeout(() => {
                navigation.navigate("profileMain");
              }, 3000);
            } else if (result.status === "failed") {
              setAnimate(false);
              showMessage({
                message: result.msg,
                type: "danger",
                icon: "danger",
              });
            } else if (result.status === "noAccount") {
              setAnimate(false);
              showMessage({
                message: result.msg,
                type: "danger",
                icon: "danger",
              });
            }
          })
          .catch((error) => {
            setAnimate(false);
            showMessage({
              message: error.message,
              type: "danger",
              icon: "danger",
            });
          });
      };
      setTimeout(() => {
        userLogin();
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
            title={"Sign in"}
            top={responsiveHeight(40)}
            left={responsiveWidth(6)}
            fontSize={responsiveFontSize(3)}
            fontWeight={"bold"}
          />
          {/* email */}
          <View
            style={{ top: responsiveHeight(43.4), left: responsiveWidth(6) }}
          >
            <Title title={"Email"} bottom={responsiveHeight(1)} />
            <CustomInput
              placeholder={"You@gmail.com"}
              onchangeText={(e) => setEmail(e)}
              value={email}
              bdWdith={1}
              padding={responsiveWidth(4)}
              bRadius={10}
              width={responsiveWidth(86)}
              keyboardType={"email-address"}
            />
          </View>
          {/* password */}
          <View
            style={{ top: responsiveHeight(46.4), left: responsiveWidth(6) }}
          >
            <Title title={"Password"} bottom={responsiveHeight(1)} />
            <CustomInput
              placeholder={"You@gmail.com"}
              onchangeText={(e) => setPassword(e)}
              value={password}
              bdWdith={1}
              padding={responsiveWidth(4)}
              bRadius={10}
              width={responsiveWidth(86)}
              keyboardType={"visible-password"}
              secureTextEntry={showPassword}
              setIcon={true}
              iconName={"eye"}
              iconColor={LIGHT_BLACK}
              iconSize={22}
              btnClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          </View>
          {/* remember me and forgot password */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                top: responsiveHeight(50),
                left: responsiveWidth(6),
              }}
            >
              <Checkbox
                value={checked}
                onValueChange={setChecked}
                color={checked ? ORANGE : undefined}
              />

              <Text
                style={{
                  paddingLeft: responsiveWidth(2),
                  paddingTop: responsiveHeight(0.2),
                }}
              >
                Remember Me
              </Text>
              {/* forgot password */}
              <Text
                style={{ position: "absolute", left: 255 }}
                onPress={() => {
                  navigation.navigate("forgetPassword");
                }}
              >
                Forgot Password?
              </Text>
            </View>
          </View>
          {/* sign in button */}
          <Button
            title={"Sign in"}
            top={responsiveHeight(55)}
            padding={responsiveWidth(3)}
            bgColor={ORANGE}
            textColor={WHITE}
            align={"center"}
            ml={responsiveWidth(10)}
            mr={responsiveWidth(10)}
            borderRadius={10}
            btnClick={handleSignIn}
          />
          <TextBelow
            label={"Don’t have an account? Sign up"}
            btnClick={() => navigation.navigate("signup")}
            top={responsiveHeight(58)}
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

export default SignIn;

const styles = StyleSheet.create({});
