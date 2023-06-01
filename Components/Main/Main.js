import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
// import { FontAwesome } from "@expo/vector-icons";
import Settings from "./Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Details from "./Details";
import Home from "./Home";
import { Ionicons } from "@expo/vector-icons";
import Cart from "./Cart";
import Favourite from "./Favourite";
import { GRAY, ORANGE } from "../../helpers/Colors";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Fragment>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "ios-home-outline";
            } else if (route.name === "Favourite") {
              iconName = focused ? "heart" : "ios-heart-outline";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "ios-cart-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "person" : "ios-person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "yellow",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: ORANGE,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favourite" component={Favourite} />
        <Tab.Screen name="Cart" component={Cart} />
        {/* <Tab.Screen name="Details" component={Details} /> */}
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </Fragment>
  );
};

export default Main;

const styles = StyleSheet.create({});
