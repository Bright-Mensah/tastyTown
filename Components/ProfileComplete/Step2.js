import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveFontSize,
  responsiveScreenWidth,
  responsiveScreenHeight,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import wave from "../../assets/bg.png";
import Title from "../../helpers/Title";
import { SafeAreaView } from "react-native-safe-area-context";
import { BLACK, GRAY, LIGHT_BLACK, ORANGE, WHITE } from "../../helpers/Colors";
import Icon from "../../helpers/Icon";
import CustomInput from "../../helpers/CustomInput";
import { Divider } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../helpers/Button";
import * as Animatable from "react-native-animatable";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Step2 = ({ navigation }) => {
  const [animation, setAnimation] = useState("");
  const [loading, setLoading] = useState(false);
  const [securityCode, setSecurityCode] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [fadeDownAnimation, setFadeDownAnimation] = useState("fadeInDownBig");
  const [signInEmail, setSignInEmail] = useState("");

  // get email from sigining in
  const readData = async () => {
    const email = JSON.parse(await AsyncStorage.getItem("email"));
    setSignInEmail(email);
  };

  readData();

  const handleProfile = () => {
    setLoading(!loading);

    setFadeDownAnimation("");

    // check if the inputs or fields are not empty

    if (securityCode === "") {
      setFadeDownAnimation("");
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "Security code is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 800);
    } else if (phone === "") {
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "Phone is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 800);
    } else if (location === "") {
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "location is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 800);
    } else {
      // check if the length of the security code equals to 4 digit
      if (securityCode.trim().length == 4) {
        // check if phone is equal  or greater than 10 digits
        if (phone.trim().length >= 10) {
          function completeProfile2() {
            fetch(`http://localhost:4500/profile2/${signInEmail}`, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                securityCode,
                phone,
                location,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((result) => {
                setLoading(false);
                // console.log(result);
                if (result.status === "success") {
                  showMessage({
                    message: result.msg,
                    type: "success",
                    icon: "success",
                  });
                  setTimeout(() => {
                    setAnimation("fadeOutUpBig");
                  }, 2000);

                  // navigate to the profile step2 to complete your profile
                  setTimeout(() => {
                    navigation.navigate("ProfileStep3");
                  }, 4000);
                } else if (result.status === "error") {
                  showMessage({
                    message: result.msg,
                    type: "danger",
                    icon: "auto",
                  });
                } else {
                }
              })
              .catch((error) => {
                setLoading(false);
                showMessage({
                  message: error.message,
                  type: "danger",
                  icon: "danger",
                });
              });
          }

          setTimeout(() => {
            completeProfile2();
          }, 5000);
        } else {
          setFadeDownAnimation("");
          setTimeout(() => {
            setLoading(false);

            showMessage({
              message: "Phone should be equal or greater than 10 digits",
              type: "danger",
              icon: "auto",
              titleStyle: {
                fontSize: responsiveFontSize(1.8),
                // textAlign: "center",
                padding: responsiveHeight(1.3),
              },
            });
          }, 800);
        }
      } else {
        setFadeDownAnimation("");
        setTimeout(() => {
          setLoading(false);

          showMessage({
            message: "Security Code should be equal to 4 digits",
            type: "danger",
            icon: "auto",
            titleStyle: {
              fontSize: responsiveFontSize(2.0),
              // textAlign: "center",
              padding: responsiveHeight(1.3),
            },
          });
        }, 800);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      {loading ? (
        loading
      ) : (
        <Animatable.View
          animation={animation ? animation : fadeDownAnimation}
          duration={1500}
        >
          <ImageBackground
            source={wave}
            style={{
              width: responsiveScreenWidth(100),
              height: responsiveScreenHeight(100),
            }}
          >
            <SafeAreaView>
              <View style={{ alignItems: "center" }}>
                <Title
                  title={"Fill in your bio to get started"}
                  fontSize={responsiveFontSize(2.7)}
                  // left={responsiveScreenWidth(10)}
                  top={responsiveScreenHeight(4)}
                  fontWeight={"bold"}
                  color={WHITE}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon
                  iconName={"camera"}
                  iconSize={responsiveFontSize(7)}
                  ml={responsiveHeight(10)}
                  iconColor={WHITE}
                  // bgColor={LIGHT_BLACK}
                  btnClick={() => console.log("yeah")}
                />
              </View>

              <View>
                <Title
                  title={"Security Code (4) digit"}
                  top={responsiveScreenHeight(20)}
                  left={responsiveScreenWidth(10)}
                  color={LIGHT_BLACK}
                  fontSize={responsiveFontSize(2)}
                  fontWeight={"bold"}
                />
                <CustomInput
                  placeholder={"Your Security code"}
                  top={responsiveScreenHeight(23)}
                  left={responsiveScreenWidth(8)}
                  placeholderTextColor={GRAY}
                  Length={4}
                  keyboardType={"number-pad"}
                  onchangeText={(text) => setSecurityCode(text)}
                  value={securityCode}
                />
                <Divider
                  color={BLACK}
                  width={1}
                  style={{
                    top: responsiveHeight(24),
                    marginLeft: responsiveScreenWidth(8),
                    width: responsiveScreenWidth(80),
                  }}
                />
                {/* phone */}
                <Title
                  title={"Phone "}
                  top={responsiveScreenHeight(27)}
                  left={responsiveScreenWidth(10)}
                  color={LIGHT_BLACK}
                  fontWeight={"bold"}
                  fontSize={responsiveFontSize(2)}
                />
                <CustomInput
                  placeholder={"Your Phone Number"}
                  top={responsiveScreenHeight(29)}
                  left={responsiveScreenWidth(8)}
                  placeholderTextColor={GRAY}
                  keyboardType={"phone-pad"}
                  Length={14}
                  onchangeText={(text) => setPhone(text)}
                  value={phone}
                />
                <Divider
                  color={BLACK}
                  width={1}
                  style={{
                    top: responsiveHeight(30),
                    marginLeft: responsiveScreenWidth(8),
                    width: responsiveScreenWidth(80),
                  }}
                />

                {/* last name */}
                <Title
                  title={"Location"}
                  top={responsiveScreenHeight(33)}
                  left={responsiveScreenWidth(10)}
                  color={LIGHT_BLACK}
                  fontWeight={"bold"}
                  fontSize={responsiveFontSize(2)}
                />
                <CustomInput
                  placeholder={"Your Location"}
                  top={responsiveScreenHeight(35)}
                  left={responsiveScreenWidth(8)}
                  placeholderTextColor={GRAY}
                  onchangeText={(text) => setLocation(text)}
                  value={location}
                />
                <Divider
                  color={BLACK}
                  width={1}
                  style={{
                    top: responsiveHeight(36),
                    marginLeft: responsiveScreenWidth(8),
                    width: responsiveScreenWidth(80),
                  }}
                />
                {/* date of birth */}
                {/* <Title
                title={"Date Of Birth"}
                top={responsiveScreenHeight(39)}
                left={responsiveScreenWidth(10)}
                color={LIGHT_BLACK}
                fontWeight={"bold"}
                fontSize={responsiveFontSize(2)}
              /> */}
                {/* <CustomInput
                placeholder={"Your Birthday (dd-mm-yy)"}
                top={responsiveScreenHeight(41)}
                left={responsiveScreenWidth(8)}
                placeholderTextColor={GRAY}
              /> */}
                {/* <Divider
                color={BLACK}
                width={1}
                style={{
                  top: responsiveHeight(42),
                  marginLeft: responsiveScreenWidth(8),
                  width: responsiveScreenWidth(80),
                }}
              /> */}
                <View>
                  {/* next button */}
                  <Button
                    title={"Next"}
                    top={responsiveScreenHeight(45)}
                    bgColor={ORANGE}
                    textColor={WHITE}
                    width={responsiveScreenWidth(90)}
                    ml={responsiveScreenWidth(5)}
                    padding={responsiveScreenWidth(3)}
                    borderRadius={14}
                    // setAnimation("fadeOutUpBig");
                    // setTimeout(() => {
                    //   navigation.navigate("ProfileStep3");
                    // }, 3000);
                    btnClick={handleProfile}
                  />
                </View>
              </View>
              {/* next button */}
            </SafeAreaView>
          </ImageBackground>
          <StatusBar barStyle={"light-content"} />
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
    </KeyboardAwareScrollView>
  );
};

export default Step2;

const styles = StyleSheet.create({});
