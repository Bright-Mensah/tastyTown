import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";

const Home = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          textAlign: "center",
          marginTop: height - 900,
          fontWeight: "bold",
        }}
      >
        Select a meal type
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ImageBackground
          borderRadius={13}
          source={require("../../assets/Banner.png")}
          style={{
            width: width / 1.1,
            height: height / 6.2,
            marginHorizontal: width / 20,
            marginVertical: height / 30,
          }}
        >
          <Text
            style={tw.style("text-white", {
              margin: width / 25,
              fontSize: width / 17,
            })}
          >
            Get <Text>50%</Text> As a JOINING BONUS
          </Text>
        </ImageBackground>
      </View>

      <Text>height : {height}</Text>
      <Text>width : {width}</Text>
    </View>
  );
};

export default Home;
