import React from 'react';
import { View, Button, StyleSheet, Pressable, Text } from "react-native";

export const HannaBtn = ({ onPress, title }) => {
    return(
    <Pressable onPress={onPress} style={[styles.btnText,styles.btn, styles[`${style}`]]}>

      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
    );
};

const styles = StyleSheet.create({
    btnText: {
        color: "white",
        fontSize: 16,
    },

    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 8
    },

    mainBtn: {
        backgroundColor: "#0882F5",
        borderRadius: 0
    },

    redBtn: {
        backgroundColor: "#F12C20",
        borderRadius: 50
    },
    greenBtn: {
        backgroundColor: "#3B8905",
        borderRadius: 50
    },

    blackBtn: {
        backgroundColor: "#030303",
        paddingVertical: 12,
        paddingHorizontal: 50,
    }
});