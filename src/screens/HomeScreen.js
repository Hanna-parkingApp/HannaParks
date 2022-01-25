import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Map from '../components/Map'
import { useSharedValue } from 'react-native-reanimated';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import GeoBar from '../components/GeoBar';
import BottomSheet from '../components/BottomSheetView';
import Header from '../components/Header';


export default function App() {
  const { width, height } = useWindowDimensions();

  const y = useSharedValue(0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />

      <Map width={width} height={height}/>

      <GeoBar panY={y} />

      <BottomSheet panY={y} />

      {/* <SafeAreaView
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <View style={styles.container}>
          <SearchBar panY={y} />
          <NavBar panY={y} />
        </View>
      </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});