import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function MyButton(props) {
  const { onPress, title = 'Save', bgColor = '#48D1CC' } = props;
  return (
    <Pressable style={[styles.button, {backgroundColor: bgColor}]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    //backgroundColor: '#48D1CC',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});