import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { View,StyleSheet } from 'react-native';

const AvatarImageExample = () => {
  return (
  	<View style={styles.view}>
      {
      /* <Avatar.Image size={80} source={require('/Users/shovalgibly/Desktop/HannaParks/assets/avt1.jpeg')} style={styles.img}/>
      <Avatar.Image size={80} source={require('/Users/shovalgibly/Desktop/HannaParks/assets/avt2.png')} style={styles.img}/> */}
      <Avatar.Image size={30} source={require('/Users/shovalgibly/Desktop/HannaParks/assets/avt3.png')} style={styles.img}/>
    </View> 
  );
};
export default AvatarImageExample;

const styles = StyleSheet.create ({
	view : {
	  flexDirection: "row",
      marginTop : 10,
      marginLeft : 40
	},
 	img: {
    marginRight : 25
 	}
})