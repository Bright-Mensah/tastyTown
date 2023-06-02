import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LIGHT_BLACK, ORANGE, WHITE } from "../../helpers/Colors";
import { Divider } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chase } from "react-native-animated-spinkit";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const Settings = ({ email, navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userDob, setUserDob] = useState("");

  const [appRendered, setAppRendered] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { height, width, fontScale } = useWindowDimensions();

  // fetch(`http://localhost:4500/user/${userEmail}`, {

  const getData = () => {
    [
      fetch(`http://localhost:4500/user/${email}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((response) => {
          // setAppRendered(true);
          setUserName(response.data.firstname + " " + response.data.lastname);
          setUserNumber(response.data.phone);
          setUserEmail(response.data.email);
          setUserLocation(response.data.Location);
          setUserDob(response.data.dateOfBirth);
        })

        .catch((error) => console.log(error)),
    ];
  };

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      getData();
    }, 2500);
  }, []);

  // get user details

  function handleLogout() {
    setAnimate(true);
    // remove email from storage
    function removeEmail() {
      AsyncStorage.removeItem("email");

      setTimeout(() => {
        setAnimate(false);

        navigation.navigate("signin");
      }, 600);
    }

    setTimeout(() => {
      removeEmail();
    }, 900);
  }

  return (
    <Fragment>
      {animate ? (
        animate
      ) : (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <Text style={{ fontSize: fontScale * 23, color: WHITE }}>
                Name: {userName}
              </Text>
            </View>
            <Divider />
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <Text style={{ fontSize: fontScale * 20, color: WHITE }}>
                Phone: {userNumber}
              </Text>
            </View>
            <Divider />
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <Text style={{ fontSize: fontScale * 20, color: WHITE }}>
                Email: {userEmail}
              </Text>
            </View>
            <Divider />
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <Text style={{ fontSize: fontScale * 20, color: WHITE }}>
                Location: {userLocation}
              </Text>
            </View>
            <Divider />
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <Text style={{ fontSize: fontScale * 20, color: WHITE }}>
                Date of birth: {userDob}
              </Text>
            </View>
            <Divider />
            {/* change password  */}
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("forgetPassword")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="lock-closed" size={50} color={ORANGE} />
                  <Text
                    style={{
                      fontSize: fontScale * 15,
                      color: WHITE,
                      padding: 10,
                    }}
                  >
                    change Password
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Divider />

            {/* logout */}
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <TouchableOpacity onPress={handleLogout}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="log-out" size={50} color={ORANGE} />
                  <Text
                    style={{
                      fontSize: fontScale * 15,
                      color: WHITE,
                      padding: 10,
                    }}
                  >
                    logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Divider />

            {/* delete account */}
            <View
              style={{
                backgroundColor: LIGHT_BLACK,
                padding: 10,
                paddingBottom: 50,
              }}
            >
              <TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="trash" size={50} color={ORANGE} />
                  <Text
                    style={{
                      fontSize: fontScale * 15,
                      color: WHITE,
                      padding: 10,
                    }}
                  >
                    Delete Account
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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

export default Settings;

const styles = StyleSheet.create({});
