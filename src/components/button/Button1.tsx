import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {
    name: string,
    onPress?: () => void,
    backgroundColor?: string,
    color?: string,
    fontSize?: number,
    style?: object,
}

const Button1 = ({name, onPress, backgroundColor, color, fontSize, style} : Props) => {
  return (
    <View style={{width: '100%'}}>
        <TouchableOpacity onPress={onPress} style={[styles.button, style, {backgroundColor: backgroundColor || '#007BFF'}]}>
            <Text style={[styles.text, {color: color || 'black', fontSize: fontSize || 16}]}>{name}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Button1

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    text: {
        fontWeight: 'bold',
        fontFamily: 'serif',
    }
})