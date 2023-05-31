import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
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
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { Chase } from "react-native-animated-spinkit";

const Step1 = ({ navigation }) => {
  const [animate, setAnimate] = useState("");
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [sigInEmail, setSignInEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });
  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   } else {
  //     console.log("No Image Selected");
  //   }
  // };

  // get email from sigining in
  const readData = async () => {
    const email = JSON.parse(await AsyncStorage.getItem("email"));
    setSignInEmail(email);
  };

  readData();

  const handleProfile = () => {
    // check if none of the fields or inputs are empty

    setLoading(!loading);

    if (username === "") {
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "username is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 800);
    } else if (firstname === "") {
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "firstname is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 800);
    } else if (lastname === "") {
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "lastname is empty",
          type: "warning",
          icon: "auto",
          titleStyle: {
            fontSize: responsiveFontSize(2.2),
            textAlign: "center",
            padding: responsiveHeight(1.3),
          },
        });
      }, 800);
    } else if (dateOfBirth === "") {
      setTimeout(() => {
        setLoading(false);

        showMessage({
          message: "date of birth is empty",
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
      const completeFirstProfile = () => {
        fetch(`http://localhost:4500/profile/${sigInEmail}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            firstname,
            lastname,
            dateOfBirth,
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
                setAnimate("fadeOutUpBig");
              }, 2000);

              // navigate to the profile step2 to complete your profile
              setTimeout(() => {
                navigation.navigate("ProfileStep2");
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
      };
      setTimeout(() => {
        completeFirstProfile();
      }, 5000);
    }
  };

  return (
    <KeyboardAwareScrollView>
      {loading ? (
        loading
      ) : (
        <Animatable.View animation={animate} duration={2000}>
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
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: responsiveWidth(20),
                      height: responsiveHeight(13),
                      marginTop: responsiveHeight(5),
                    }}
                  />
                ) : (
                  <Icon
                    iconName={"camera"}
                    iconSize={responsiveFontSize(7)}
                    ml={responsiveHeight(10)}
                    iconColor={WHITE}
                    // bgColor={LIGHT_BLACK}
                    // btnClick={pickImage}
                  />
                )}
              </View>

              <View>
                <Title
                  title={"Username"}
                  top={responsiveScreenHeight(22)}
                  left={responsiveScreenWidth(10)}
                  color={LIGHT_BLACK}
                  fontSize={responsiveFontSize(2)}
                  fontWeight={"bold"}
                />
                <CustomInput
                  placeholder={"Your username"}
                  top={responsiveScreenHeight(23)}
                  left={responsiveScreenWidth(8)}
                  placeholderTextColor={GRAY}
                  onchangeText={(text) => setUsername(text)}
                  value={username}
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
                {/* first name */}
                <Title
                  title={"First name"}
                  top={responsiveScreenHeight(27)}
                  left={responsiveScreenWidth(10)}
                  color={LIGHT_BLACK}
                  fontWeight={"bold"}
                  fontSize={responsiveFontSize(2)}
                />
                <CustomInput
                  placeholder={"Your Firstname"}
                  top={responsiveScreenHeight(29)}
                  left={responsiveScreenWidth(8)}
                  placeholderTextColor={GRAY}
                  onchangeText={(text) => setFirstName(text)}
                  value={firstname}
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
                  title={"Last name"}
                  top={responsiveScreenHeight(33)}
                  left={responsiveScreenWidth(10)}
                  color={LIGHT_BLACK}
                  fontWeight={"bold"}
                  fontSize={responsiveFontSize(2)}
                />
                <CustomInput
                  placeholder={"Your Lastname"}
                  top={responsiveScreenHeight(35)}
                  left={responsiveScreenWidth(8)}
                  placeholderTextColor={GRAY}
                  onchangeText={(text) => setLastName(text)}
                  value={lastname}
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
                <Title
                  title={"Date Of Birth"}
                  top={responsiveScreenHeight(39)}
                  left={responsiveScreenWidth(10)}
                  color={LIGHT_BLACK}
                  fontWeight={"bold"}
                  fontSize={responsiveFontSize(2)}
                />
                <CustomInput
                  placeholder={"Your Birthday (dd-mm-yy)"}
                  top={responsiveScreenHeight(41)}
                  left={responsiveScreenWidth(8)}
                  placeholderTextColor={GRAY}
                  onchangeText={(text) => setDateOfBirth(text)}
                  value={dateOfBirth}
                />
                <Divider
                  color={BLACK}
                  width={1}
                  style={{
                    top: responsiveHeight(42),
                    marginLeft: responsiveScreenWidth(8),
                    width: responsiveScreenWidth(80),
                  }}
                />
                <View style={{ backgroundColor: WHITE }}>
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
                    // setAnimate("fadeOutUpBig");
                    // setTimeout(() => {
                    //   navigation.navigate("ProfileStep2");
                    // }, 2000);
                    btnClick={handleProfile}
                  />
                </View>
                {/* next button */}
                {/* <Button
              title={"Next"}
              top={responsiveScreenHeight(50)}
              bgColor={ORANGE}
              textColor={WHITE}
              width={responsiveScreenWidth(90)}
              ml={responsiveScreenWidth(5)}
              padding={responsiveScreenWidth(3)}
              borderRadius={14}
            /> */}
              </View>
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

export default Step1;

const styles = StyleSheet.create({});
