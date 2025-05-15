import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

import CustomScreen from '../../components/CustomScreen'
import { khaibao } from '../../../types'
import Back from '../../components/button/Back'
import TitleLogo from '../../components/title/TitleLogo'
import InputEmail from '../../components/input/InputEmail'
import InputPassword from '../../components/input/InputPassword'
import Button1 from '../../components/button/Button1'

type NavigationProp = NativeStackNavigationProp<khaibao>


const login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPass, setErrorPass] = useState<string>('')

  const click_login = async () => {
    setErrorEmail('')
    setErrorPass('')
    if (email === '') {
      setErrorEmail('Vui lòng nhập email')
      return
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      setErrorEmail('Email không hợp lệ')
      return
    }
    if (password === '') {
      setErrorPass('Vui lòng nhập mật khẩu')
      return
    }

    try{
      await auth().signInWithEmailAndPassword(email, password)
      navigation.navigate('Home')
    }catch (error: any) {
      handleAuthError(error)
    }
  }

    const handleAuthError = (error: any) => {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setErrorPass('Email hoặc mật khẩu không đúng')
        break
      case 'auth/too-many-requests':
        Alert.alert('Lỗi', 'Tài khoản tạm thời bị khóa do nhập sai nhiều lần')
        break
      case 'auth/user-disabled':
        Alert.alert('Lỗi', 'Tài khoản đã bị vô hiệu hóa')
        break
      default:
        Alert.alert('Lỗi', 'Đăng nhập thất bại. Vui lòng thử lại sau')
        console.error(error)
    }
  }

  const navigation = useNavigation<NavigationProp>()

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }

  const click_home = () => {
    navigation.navigate('Home')
  }
  return (
    <CustomScreen>
        <Back onPress={click_home} buttonText='Trở lại trang chủ'/>
        <View style={styles.container}>
        <TitleLogo title='Login'/>
        <InputEmail value={email}  onChangeText={setEmail} placeholder='Email enter' error={errorEmail}/>
        <InputPassword value={password} onChangeText={setPassword} placeholder='Password enter' error={errorPass}/>
        <Button1 name='Login' onPress={click_login} backgroundColor='#468cff' color='#f9f9f9' style={styles.btn}/>
        <TouchableOpacity style={styles.dangky} onPress={handleSignUp}>
            <Text style={[styles.textDK]}>Bạn chưa có mật khẩu? <Text style={{color: '#468cff', fontWeight: 'bold'}}>Đăng ký</Text></Text>
        </TouchableOpacity>
        </View>
    </CustomScreen>
  )
}

export default login

const styles = StyleSheet.create({
      container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 30,
    height: 50,
  },
  dangky: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDK: {
    fontSize: 16,
  }
})