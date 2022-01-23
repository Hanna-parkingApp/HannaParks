import { StyleSheet, Text, View, Button, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, {useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
}

const BottomSheetView = () => {

    const dimensions = useWindowDimensions();

    //  In order the sheet will have a shared view the the background view
    const top = useSharedValue(
        dimensions.height
    );
    const animatedStyle = useAnimatedStyle(() => {
        return {
            //  Automatically use that funcion every time it changes
             top: withSpring(top.value, SPRING_CONFIG),
            // top: top.value,
        };
    });
    const gestureHandler = useAnimatedGestureHandler({
        // initial top value in that context box
        onStart(_, context) {
            context.startTop = top.value;
        },
        // Moving up & down along side our touch
        onActive(event, context) {
            top.value = context.startTop + event.translationY;
        },
        onEnd() {
            //  Dismissing snap point
            if (top.value > dimensions.height / 2 + 200) {
                top.value = dimensions.height;
            } else {
                top.value = dimensions.height / 2
            }
        }
    });
  return (
    <>
        <View style={styles.container}>
            <Button title='Open Sheet' onPress={() => {
                top.value = withSpring(
                    dimensions.height / 2,   //  Half screen
                    SPRING_CONFIG,
                );
            }} />
        </View>
        <PanGestureHandler
        onGestureEvent={gestureHandler}
        >
            <Animated.View style = {[styles.animatedView, animatedStyle]}>
                <Text>Sheet</Text>
            </Animated.View>
        </PanGestureHandler>
    </>
  );
};

export default BottomSheetView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.94,
        elevation: 5,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
