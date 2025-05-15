import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
    value: string
    onChangeText: (text: string) => void
    placeholder?: string
    error?: string
}

const InputPassword = ({value, onChangeText, placeholder, error }: Props) => {
    const [secureText, setSecureText] = useState(true)
    
  return (
    <>
        <Text style={styles.log}>{error ? error : ''}</Text>
        <View style={styles.container}>
            <Ionicons name="key" size={24} color="black" />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureText}
                autoCapitalize="none"
                placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.icon}>
                <Ionicons name={secureText ? 'eye-outline' : 'eye-off-outline'} size={24} color="#888" />
            </TouchableOpacity>
        </View>
    </>
  )
}

export default InputPassword

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        gap: 10,
        backgroundColor: '#f2f2f3',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 8,
        borderColor: '#007BFF',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        color: 'black',
    },
    log: {
        color: 'red',
        fontSize: 12,
        marginVertical: 5,
        fontWeight: 'bold',
    },
    icon: {
        padding: 10,
    }
})