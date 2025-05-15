import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

import { khaibao } from '../../../types'
import Back from '../../components/button/Back'
import TitleLogo from '../../components/title/TitleLogo'
import InputEmail from '../../components/input/InputEmail'
import InputPassword from '../../components/input/InputPassword'
import Button1 from '../../components/button/Button1'
import CustomScreen from '../../components/CustomScreen'

type NavigationProp = NativeStackNavigationProp<khaibao>

const signup = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repassword, setRePassword] = useState<string>('')
    const [errorRePass, setErrorRePass] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const [errorPass, setErrorPass] = useState<string>('')

    const navigation = useNavigation<NavigationProp>()

    const click_signup = async () => {
        setErrorEmail('')
        setErrorPass('')
        setErrorRePass('')
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

        if (repassword === '') {
            setErrorRePass('Vui lòng nhập lại mật khẩu')
            return
        }

        if (password !== repassword) {
            setErrorRePass('Mật khẩu không khớp')
            return
        }

        try {
            const Users = await auth().createUserWithEmailAndPassword(email, password)
            addUser(Users.user.uid)
            ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT)
            navigation.navigate('Login')
        }catch (error) {
        }
        
    }
      const addUser = (userId: string) => {
        database()
        .ref(`/users/${userId}`)
        .set({
            email: email,
            password: password,
            isAdmin: 0
        })
        .then(() => {
        })
        .catch((error) => {
        })
    }

    const click_login = () => {
        navigation.navigate('Login')
    }

    const click_home = () => {
        navigation.navigate('Home')
    }


  return (
    <CustomScreen>
        <Back onPress={click_home} buttonText='Trở lại trang chủ'/>
        <View style={styles.container}>
        <TitleLogo title='Đăng ký'/>
        <InputEmail value={email}  onChangeText={setEmail} placeholder='Email enter' error={errorEmail}/>
        <InputPassword value={password} onChangeText={setPassword} placeholder='Nhập mật khẩu' error={errorPass}/>
        <InputPassword value={repassword} onChangeText={setRePassword} placeholder='Nhập lại mật khẩu' error={errorRePass}/>

        <Button1 name='Đăng ký' onPress={click_signup} backgroundColor='#468cff' color='#f9f9f9' style={styles.btn}/>
        <TouchableOpacity style={styles.dangky} onPress={click_login}>
            <Text style={[styles.textDK]}>Bạn đã có mật khẩu? <Text style={{color: '#468cff', fontWeight: 'bold'}}>Đăng nhập</Text></Text>
        </TouchableOpacity>
        </View>
    </CustomScreen>
  )
}

export default signup

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