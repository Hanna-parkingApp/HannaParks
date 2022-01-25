import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("screen");

const BottomSheetView2 = () => {
    const [alignment] = useState(new Animated.Value(0));

    //  Animate configuration
    const bringUpBottomSheet = () => {
        Animated.timing(alignment, {
            toValue: 1,
            duration: 500
        }).start();
    }

    const hideBottomSheet = () => {
        Animated.timing(alignment, {
            toValue: 0,
            duration: 500
        }).start();
    }

    const bottomSheetInterpolate = alignment.interpolate({
        inputRange: [0,1],
        outputRange: [-height / 2.4 + 150, 0]
    });

    const bottomSheetStyle = {
        bottom: bottomSheetInterpolate
    }

    const gestureHandler = (e) => {
        console.log("scrool pressed");
        if (e.nativeEvent.contentOffset.y > 0) bringUpBottomSheet();
        else if (e.nativeEvent.contentOffset.y < 0) hideBottomSheet();
    }
  return (
    <Animated.View style = {[ styles.container, bottomSheetStyle ]}>
        <ScrollView style = {styles.grabber} onScroll={() => gestureHandler(e)}></ScrollView>
        <Text>Hello this is bottom sheet</Text>
    </Animated.View>
  );
};

export default BottomSheetView2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height / 2.4,
        width: width / 1.05,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginHorizontal: 10,
    },
    grabber: {
        width: 60,
        borderTopWidth: 5,
        borderTopColor: '#aaa',
        top: 0,
    }
});
