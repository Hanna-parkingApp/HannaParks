import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

const HannaText = () => {
  const [titleText, setTitleText] = useState("Hanna");


  return (
      <Text style={styles.titleText} >
        {titleText} 
        <AntDesign name={"car"} size={15} color="#1e90ff" />
        {"\n"}
      </Text>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color:"#1e90ff",
    fontFamily: "Cochin",
    alignSelf: 'center'

  }
});

export default HannaText;