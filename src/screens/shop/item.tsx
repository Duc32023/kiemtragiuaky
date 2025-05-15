import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import database from '@react-native-firebase/database';
import { RouteProp, useRoute } from '@react-navigation/native';
import CustomScreen from '../../components/CustomScreen';
import { khaibao } from '../../../types';
import TitleTop from '../../components/title/TitleTop';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import TitleTop2 from '../../components/title/TitleTop2';

type DetailRouteProp = RouteProp<khaibao, 'Item'>;
type NavigationProp = NativeStackNavigationProp<khaibao>;

interface ItemData {
  id: string;
  name: string;
  image: string;
  categoryId: string;
}

const CategoryItemsScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const navigation = useNavigation<NavigationProp>();
  
    const { id: categoryId, name } = route.params; 

    const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    const itemsRef = database().ref('/items');

    const listener = itemsRef.on('value', snapshot => {
      const data = snapshot.val();

      if (data) {
        const filteredItems = Object.entries(data)
          .filter(([key, item]: [string, any]) => item.categoryId === categoryId)
          .map(([key, item]: [string, any]) => ({
            id: key,
            ...item,
          }));
        setItems(filteredItems);
      } else {
        setItems([]);
      }
    });

    return () => {
      itemsRef.off('value', listener);
    };
  }, [categoryId]);

const handleItemPress = (item: ItemData) => {
  const user = auth().currentUser;

  if (!user) {
    ToastAndroid.show('Bạn cần đăng nhập!', ToastAndroid.SHORT);
    return;
  }

  const userId = user.uid;
  const cartRef = database().ref(`/cart/${userId}/${item.id}`);

  cartRef.once('value').then(snapshot => {
    const existingItem = snapshot.val();
    if (existingItem) {
      cartRef.update({
        quantity: existingItem.quantity + 1,
      });
    } else {
      cartRef.set({
        name: item.name,
        image: item.image,
        categoryId: item.categoryId,
        price: 20000,
        quantity: 1,
      });
    }

    ToastAndroid.show(`${item.name} đã thêm vào giỏ`, ToastAndroid.SHORT);
  });
};



  if (items.length === 0) {
    return (
      <CustomScreen>
        <TitleTop2 icon='arrow-back-outline' title={name} onPress={() => navigation.navigate('Home')}/>

        <Text>Không có món nào trong danh mục này.</Text>
      </CustomScreen>
    );
  }

  return (
    <CustomScreen>
        <TitleTop2 icon='arrow-back-outline' title={name} onPress={() => navigation.navigate('Home')} onPressCart={() => navigation.navigate('Detail')}/>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </CustomScreen>
  );
};

export default CategoryItemsScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});
