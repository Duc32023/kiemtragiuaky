import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
type Props = {
    onPressCart?: () => void;
    onPressLogout?: () => void;
    onPress?: () => void;
    title?: string;
    icon?: string;
}


const TitleTop = ({onPress, onPressCart, onPressLogout, title, icon="menu-outline"} : Props) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={{minWidth: 100}} onPress={onPress}>
            <Ionicons name={icon} size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.containerIcon}>
            <TouchableOpacity onPress={onPressCart}>
                <Ionicons name="cart-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressLogout}>
                <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default TitleTop

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
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
})