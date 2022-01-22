import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const Input = ({ children, value, onChane, ...rest }) => {

    const BaseInput = ({children, label }) => (
        <View>
          <Text>{label}</Text>
          {children}
        </View>
      );

  return (
    <BaseInput {...rest}>
      <TextInput value={value} style={styles.inputField}/>
    </BaseInput>
  );
};

const styles = StyleSheet.create({
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default Input;
