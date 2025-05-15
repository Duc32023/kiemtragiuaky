import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
type Props = {
    onPressCart?: () => void;
    onPress?: () => void;
    title?: string;
    icon?: string;
}


const TitleTop2 = ({onPress, onPressCart, title, icon="menu-outline"} : Props) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Ionicons name={icon} size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.containerIcon}>
            <TouchableOpacity onPress={onPressCart}>
                <Ionicons name="cart-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default TitleTop2

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
})