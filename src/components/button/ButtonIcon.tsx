import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
  icon: string,
  text: string,
  onPress?: () => void,
  backgroundColor?: string,
  color?: string,
  fontSize?: number,
  style?: ViewStyle,
  textStyle?: TextStyle,
}

const ButtonIcon = ({ icon, text, onPress, backgroundColor = '#468cff', color = '#fff', fontSize = 16, style, textStyle}: Props) => {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.button, style, { backgroundColor }]}
      >
        <Ionicons name={icon} size={22} color={color} style={styles.icon} />
        <Text style={[styles.text, { color, fontSize }, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonIcon

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontWeight: '600',
  },
})
