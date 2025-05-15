import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  onPress: () => void;
  buttonText?: string;
  buttonStyle?: object;
  textStyle?: object;
};

const Back = ({ onPress, buttonText = "Quay lại", buttonStyle, textStyle } : Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.buttonContainer, buttonStyle]}>
        <Ionicons name="arrow-back" size={20} color="#333" style={styles.icon} />
        <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginRight: 5,
  }
});

export default Back;