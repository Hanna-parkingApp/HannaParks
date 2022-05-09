import React from "react";
import { View, TextInput, StyleSheet, Text, Dimensions } from "react-native";

const FormDetail = ({
  labelValue,
  placeholderText,
  detailName,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <View style={styles.detailStyle}>
        <Text>{detailName}</Text>
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default FormDetail;

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    direction: "rtl",
  },
  detailStyle: {
    padding: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    width: 90,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 15,
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
  },
});
