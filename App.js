import { StatusBar } from "expo-status-bar";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Components/Main";

import OnBoardingShow from "./Components/OnBoardingShow";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Step1 from "./Components/ProfileComplete/Step1";
import Step2 from "./Components/ProfileComplete/Step2";
import Step3 from "./Components/ProfileComplete/Step3";
import Step4 from "./Components/ProfileComplete/Step4";
import FlashMessage from "react-native-flash-message";
import ForgetPassword from "./Components/ForgetPassword";
import ForgetPassword2 from "./Components/ForgetPasswordStep3";
import ForgetPasswordStep2 from "./Components/ForgetPasswordStep2";
import ForgetPasswordStep3 from "./Components/ForgetPasswordStep3";
import ResetPassword from "./Components/ResetPassword";
import mainScreen from "./Components/Main/Main";

export default function App() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [animate, setAnimation] = useState("fadeInDownBig");

  const Stack = createNativeStackNavigator();

  // prevent splashscreen from hiding when component renders or mounts
  SplashScreen.preventAutoHideAsync();

  // showStatusBar(false);

  useEffect(() => {
    // hide splashscreen and show statusbar after 4 seconds
    setTimeout(() => {
      SplashScreen.hideAsync();
      setShowStatusBar(false);
    }, 3000);

    // show onboarding
  }, []);

  return (
    <>
      <StatusBar hidden={showStatusBar} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="onboard">
          <Stack.Screen
            name="onboard"
            component={OnBoardingShow}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="main"
            component={Main}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="signin"
            component={SignIn}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="profileMain"
            component={Step1}
            options={{
              headerShown: false,
              animationTypeForReplace: "push",
              animation: "slide_from_bottom",
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="ProfileStep2"
            component={Step2}
            options={{
              headerShown: false,
              animationTypeForReplace: "push",
              animation: "none",
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="ProfileStep3"
            component={Step3}
            options={{
              headerShown: false,
              animationTypeForReplace: "push",
              animation: "none",
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfileStep4"
            component={Step4}
            options={{
              headerShown: false,
              animationTypeForReplace: "push",
              animation: "none",
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="forgetPassword"
            component={ForgetPassword}
            options={{
              animationTypeForReplace: "push",
              animation: "fade_from_bottom",
              headerTitle: "Forgot Password?",

              // gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="forgetPasswordStep2"
            component={ForgetPasswordStep2}
            options={{
              animationTypeForReplace: "push",
              animation: "fade_from_bottom",
              headerTransparent: true,
              headerTitle: "Reset Password",
              headerTintColor: "white",
              headerBackTitle: "",
              headerBackTitleVisible: false,

              // gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="forgetPasswordStep3"
            component={ForgetPasswordStep3}
            options={{
              animationTypeForReplace: "push",
              animation: "fade_from_bottom",
              headerShown: false,

              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="resetPassword"
            component={ResetPassword}
            options={{
              animationTypeForReplace: "push",
              animation: "fade_from_bottom",
              headerShown: false,

              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="mainScreen"
            component={mainScreen}
            options={{
              animationTypeForReplace: "push",
              animation: "fade_from_bottom",
              headerShown: false,

              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>

        {/* bottom tabs */}
      </NavigationContainer>

      <FlashMessage position={"bottom"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
