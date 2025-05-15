import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    title: string
}

const TitleLogo = ({title} : Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default TitleLogo

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
  },
  text: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#468cff',
  }
})