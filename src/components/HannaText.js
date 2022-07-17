import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Font from 'expo-font';

const HannaText = () => {
  const [titleText, setTitleText] = useState("Hanna");


  return (
      <Text style={styles.titleText} >
        {titleText} 
        <AntDesign name={"car"} size={20} color="#48D1CC" />
      </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color:"#48D1CC",
    // fontFamily: "Cochin",
    alignSelf: 'center',
    letterSpacing: 3,
    marginTop: 25
  }
});

export default HannaText;