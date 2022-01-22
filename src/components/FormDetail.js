import React from 'react';
import {View, TextInput, StyleSheet,Text, Dimensions} from 'react-native';

const FormDetail = ({labelValue, placeholderText, detailName, ...rest}) => {
    return (
        <View style={styles.inputContainer}>
          <View style={styles.detailStyle}>
            <Text>{detailName}</Text>
          </View>
          <TextInput
            value={labelValue}
            style={styles.input}
            numberOfLines={1}
            placeholder={placeholderText}
            placeholderTextColor="#666"
            {...rest}
          />
        </View>
      );
    };
    
    export default FormDetail;
    
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const styles = StyleSheet.create({
      inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      detailStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 90,
      },
      input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
      },
    });