// App.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/screens/auth/login'
import SignUp from './src/screens/auth/signup'
import Home from './src/screens/shop/home'
import Item from './src/screens/shop/item'
import Detail from './src/screens/shop/detail'
import Success from './src/screens/shop/success'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Item" component={Item} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
        <Stack.Screen name="Success" component={Success} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}