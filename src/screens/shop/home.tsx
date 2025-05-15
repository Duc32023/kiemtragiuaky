import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';

import { khaibao } from '../../../types';
import CustomScreen from '../../components/CustomScreen';
import ButtonIcon from '../../components/button/ButtonIcon';
import TitleTop from '../../components/title/TitleTop';
import CustomFlatList from '../../components/list/CustomFlatList';

interface CuisineItem {
  id: string;
  name: string;
  image: string;
}

type NavigationProp = NativeStackNavigationProp<khaibao>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cuisineData, setCuisineData] = useState<CuisineItem[]>([]);

  const handleItemPress = (item: CuisineItem) => {
    ToastAndroid.show(`Clicked on ${item.name}`, ToastAndroid.SHORT);
    navigation.navigate('Item', { id: item.id, name: item.name });
  };

  useEffect(() => {
    let userRef: FirebaseDatabaseTypes.Reference;
    let cuisineRef: FirebaseDatabaseTypes.Reference;

    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);

        // Kiểm tra quyền admin
        userRef = database().ref(`/users/${user.uid}`);
        userRef.on('value', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
          const userData = snapshot.val();
          setIsAdmin(userData?.isAdmin === 1);
        });

        // Lấy dữ liệu ẩm thực
        cuisineRef = database().ref('/categories');
        cuisineRef.on('value', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
          const data = snapshot.val();
          
          if (data) {
            const dataArray = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            setCuisineData(dataArray);
          } else {
            setCuisineData([]);
          }
        });

      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
        if (userRef) userRef.off();
        if (cuisineRef) cuisineRef.off();
      }
    });

    return () => {
      unsubscribe();
      if (userRef) userRef.off();
      if (cuisineRef) cuisineRef.off();
    };
  }, []);

  const handleLogin = () => navigation.navigate('Login');

  const handleLogout = async () => {
    try {
      await auth().signOut();
      ToastAndroid.show('Đăng xuất thành công', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Lỗi khi đăng xuất: ', error);
      ToastAndroid.show('Đăng xuất thất bại', ToastAndroid.SHORT);
    }
  };

  const click = () => {
      navigation.navigate('Detail');
}

  return (
    <CustomScreen>
      {isLoggedIn ? (
        <View style={styles.buttonContainer}>
          <TitleTop 
            title='Restaurant App'
            onPressCart={click}
            onPressLogout={handleLogout}
          />
        </View>
      ) : (
        <ButtonIcon icon="log-in-outline" text="Đăng nhập" onPress={handleLogin}/>
      )}
      
      <CustomFlatList 
        data={cuisineData} 
        numColumns={2}
        onPressItem={handleItemPress}
      />
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    gap: 16,
  },
});

export default HomeScreen;