import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import FormInput from './FormInput';
import { Ionicons } from '@expo/vector-icons';

export default function BottomSheet({ panY, SetEndPoint }) {
  const { height } = useWindowDimensions();
  const [dest, setDest] = useState();

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart(_, context) {
        context.startY = panY.value;
      },
      onActive(event, context) {
        panY.value = context.startY + event.translationY;
      },
      onEnd() {
        if (panY.value < -height * 0.4) {
          panY.value = withTiming(-(height * 0.7));
        } else {
          panY.value = withTiming(0);
        }
      },
    },
    [height]
  );


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(panY.value, [-1, 0], [-1, 0], {
            extrapolateLeft: Extrapolate.EXTEND,
            extrapolateRight: Extrapolate.CLAMP,
          }),
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          { top: height * 0.8 },
          animatedStyle,
        ]}
      >
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.contentContainer}>
            <Ionicons name='search' size={25} color={'grey'} style = {styles.searchIcon}  />
            <TextInput 
              style = {styles.searchInput}
              placeholder='Where are we going?'
              placeholderTextColor={'grey'}
              value={dest}
              onChangeText={setDest}
              // onPressIn={gestureHandler.onEnd()}
            />
            </View>
            <Ionicons name='mic' size={50} color={'white'} style = {styles.mic} />
            <Ionicons name='arrow-forward' size={50} style = {{marginRight: 10}} onPress={() => SetEndPoint(dest)} />
            <View style={styles.fakeContent} />
          </View>
        </SafeAreaView>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D6EAF8',
    shadowColor: 'black',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowOffset: {
      height: -6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    marginHorizontal: 30,
    height: 40,
    width: 250,
    
  },
  fakeContent: {
    flex: 1,
    height: 1000,
  },
  searchIcon: {
    left: 0,
    alignSelf: 'flex-start'
  },
  searchInput: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  mic: {
    backgroundColor: 'red',
    borderRadius: 40,
    borderColor: 'red',
    height: 50,
    marginRight: 20
  },
});