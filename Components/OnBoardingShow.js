import { StyleSheet, Text, View, Image } from 'react-native'
import React,{useEffect} from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { responsiveHeight as rh, responsiveWidth as rw , responsiveFontSize as rfs } from 'react-native-responsive-dimensions';

//  if the user has already clicked or the onboard has shown before
// hide it the next time the component renders or app restart





const onBoardDone =  ()=>{
  AsyncStorage.setItem("onBoardDone",JSON.stringify("true"))
}



const image1 = require("../assets/board1.png");
const image2 = require("../assets/onboard2.png");
const image3 = require("../assets/onboard3.jpg");


const OnBoardingShow = ({navigation}) => {

  useEffect(()=>{
    const readData = async ()=>{
      try{
        const result =  await AsyncStorage.getItem("onBoardDone");
        if(result !== null){

          navigation.navigate('main')
        }
       
         }catch(error){
         console.log(error);
       }
    }

    readData();

  },[])



    const pages = [
        {
          title:<Text style={{fontWeight:'bold',fontSize:rfs(3)}}>Your Comfort food lies here</Text>,
        backgroundColor:'#fff',
      image:<Image source={image1} style={{width:rw(80) ,justifyContent:'center', alignItems:'center'}} />,
      subtitle: <Text style={{fontSize:rfs(2),padding:10}}>Order your favourite meal and taste greatness</Text> },
      {
        title:<Text style={{fontWeight:'bold',fontSize:rfs(3),textAlign:'center'}}>Test fresh delicious meals anytime</Text>,
      backgroundColor:'#fff',
    image:<Image source={image2} />,
    subtitle: <Text style={{fontSize:rfs(2),padding:18,textAlign:'center'}}>We provide well prepared meal at all hours of the day</Text> },
    
      {
        title:<Text style={{fontWeight:'bold',fontSize:rfs(3)}}>Deliver to your home</Text>,
      backgroundColor:'#fff',
    image:<Image source={image3} />,
    subtitle: <Text style={{fontSize:rfs(2),padding:10}}>Enjoy a fast and smooth delivery at your doorstep</Text> },
    
    
    ]
  return (
    <View style={styles.container}>
       <Onboarding 
      pages={pages}
      onDone={()=>{
        // move to the main screen component
        navigation.navigate('main')
        onBoardDone();


        
      }}

      />
    </View>
  )
}

export default OnBoardingShow

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      
      },
})