import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { Fragment, useState } from "react";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { ORANGE, WHITE } from "../helpers/Colors";
import Button from "../helpers/Button";
import CustomInput from "../helpers/CustomInput";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetPassword = ({ navigation }) => {
  const [animate, setAnimate] = useState(false);
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // get email from storage
  const getEmail = async () => {
    let email = JSON.parse(await AsyncStorage.getItem("email"));

    setUserEmail(email);
  };

  getEmail();

  const resetPassword = () => {
    // check if all the fields are not empty
    setAnimate(true);

    if (password === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "New Password is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.1),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 300);
    } else if (Confirmpassword === "") {
      setTimeout(() => {
        setAnimate(false);
        showMessage({
          message: "Confirm Password is empty",
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
      // check if confirm password matches password
      if (Confirmpassword === password) {
        const resetUserPassword = () => {
          fetch(`http://localhost:4500/user/${userEmail}`, {
            method: "put",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((result) => {
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
                  navigation.navigate("signin");
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
            })
            .catch((error) => console.log(error));
        };

        setTimeout(() => {
          resetUserPassword();
        }, 5000);
      } else {
        setTimeout(() => {
          setAnimate(false);
          showMessage({
            message: "Password does not match",
            type: "warning",
            icon: "auto",
            titleStyle: {
              fontSize: responsiveFontSize(2.1),
              textAlign: "center",
              padding: responsiveHeight(1.3),
            },
          });
        }, 300);
      }
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
              Provide new password to reset password
            </Text>

            <CustomInput
              placeholder={"New Password"}
              value={password}
              onchangeText={(text) => setPassword(text)}
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
            <CustomInput
              placeholder={"Confirm Password"}
              value={Confirmpassword}
              onchangeText={(text) => setConfirmPassword(text)}
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
              btnClick={resetPassword}
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

export default ResetPassword;
