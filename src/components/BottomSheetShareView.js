import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  FlatList,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from "react-redux";

import { PanGestureHandler } from 'react-native-gesture-handler';
import FormInput from './FormInput';
import { Ionicons } from '@expo/vector-icons';
import GooglePlacesInput from './GooglePlacesInput';
import { useNavigation } from '@react-navigation/native';
import AddressPickup from "./AddressPickup";
import { changeDesState } from "../features/location/locationSlice";


export default function BottomSheet({ panY, handleSearch }) {

  const { height } = useWindowDimensions();
  const [dest, setDest] = useState();
  
  const navigation = useNavigation();

 const clearSearchContent = () => {
  setDest('');
 };
 const [desCoords, setDesCoords] = useState({});
 const dispatch = useDispatch();

 const fetchDestinationCoords = (lat, lng, city_name, st_name) => {
     console.log("city ==> ", city_name);
     console.log('street, ', st_name);
     let desLocation = {
         latitude: lat,
         longitude: lng
     }
     dispatch(changeDesState(desLocation));
    }
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

  const onPressLocation = () => {
    navigation.navigate('Find Destination');
  };

  return (
    // <PanGestureHandler onGestureEvent={gestureHandler}>
    //   <Animated.View
    //     style={[
    //       styles.container,
    //       { top: height * 0.8 },
    //       animatedStyle,
    //     ]}
    //   >
        // <SafeAreaView style={styles.wrapper}>
          <View style={styles.bottomCard}>
            <Text>parking location</Text>
            {/* <TouchableOpacity
            onPress={onPressLocation}
            style={styles.inputStyle}
            >
            <Text>enter your parking location</Text>
            </TouchableOpacity> */}
            <FlatList
            ListHeaderComponent={
            <>
             <View style = {{ marginBottom: 16,flex: 1 }} />
                <AddressPickup 
                 placeholderText={"Enter Destination Location"}
                 fetchAddress = {fetchDestinationCoords}
                /> 
            </>}
            keyboardShouldPersistTaps='handled'
            style = {{ backgroundColor: 'white', flex: 1, padding: 24}}
            >
                 
            </FlatList>
            {/* <View style={styles.contentContainer}>
            <Ionicons name='search' size={25} color={'grey'} style = {styles.searchIcon}  />
            <GooglePlacesInput />
            <TextInput 
              style = {styles.searchInput}
              placeholder='Where are we going?'
              placeholderTextColor={'grey'}
              value={dest}
              onChangeText={setDest}
              
              // onPressIn={gestureHandler.onEnd()}
            />
            </View> */}
            {/* <Ionicons name='arrow-forward' size={40} style = {{marginRight: 10}} onPress= {() =>{ 
              handleSearch(dest);
              clearSearchContent();
              }} /> */}
            <View style={styles.fakeContent} />
          </View>
  //       </SafeAreaView>
  //     </Animated.View>
  //   </PanGestureHandler>
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
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
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
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 10
},

});