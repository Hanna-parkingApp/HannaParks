import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

const HannaText = () => {
  const [titleText, setTitleText] = useState("Hanna");


  return (
      <Text style={styles.titleText} >
        {"\n"}
        {titleText} 
        <AntDesign name={"car"} size={20} color="#1e90ff" />
      </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    color:"#1e90ff",
    fontFamily: "Cochin",
    alignSelf: 'center'

  }
});

export default HannaText;