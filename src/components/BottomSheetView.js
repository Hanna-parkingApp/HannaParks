import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import FindDestination from "./FindDestination";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../features/profile/userDetailsSlice";

export default function BottomSheet({ panY, showBottomSheet }) {
  const { height } = useWindowDimensions();
  const [dest, setDest] = useState();

  const userDetails = useSelector(selectUserDetails);

  const navigation = useNavigation();

  const clearSearchContent = () => {
    setDest("");
  };

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
          panY.value = withTiming(-(height * 0.64)); //0.64
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

  const onPressLocation = () => {
    // navigation.push("Find Destination");
    setChooseDes(true);
  };

  const calculateTop = () => {
    console.log("calculate top: ", chooseDes);
    if (chooseDes) return 0.5;
    return 0.8;
  };

  const [chooseDes, setChooseDes] = useState(false);
  const [findParks, setFindParks] = useState(false);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          { top: height * calculateTop() },
          animatedStyle,
        ]}
      >
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.bottomCard}>
            {chooseDes ? (
              <FindDestination
                placeholderText={"Enter Destination Location"}
                handleSearch={() => {
                  setChooseDes(false);
                  showBottomSheet(false);
                }}
              />
            ) : (
              <>
                <Text>Where are you going?</Text>
                <TouchableOpacity
                  onPress={onPressLocation}
                  style={styles.inputStyle}
                  //disabled={userDetails.points > 1 ? false : true}
                >
                  <Text>
                    {userDetails.points > 1
                      ? "Choose your destination"
                      : "Not enough points for searching"}
                  </Text>
                </TouchableOpacity>
                <View style={styles.fakeContent} />
              </>
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#D6EAF8",
    shadowColor: "black",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowOffset: {
      height: -6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  bottomCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    alignSelf: "flex-start",
  },
  searchInput: {
    fontSize: 15,
    fontWeight: "normal",
  },
  inputStyle: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    marginTop: 10,
  },
});
