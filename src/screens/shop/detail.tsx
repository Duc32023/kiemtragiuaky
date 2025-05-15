import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleTop2 from '../../components/title/TitleTop2';
import CustomScreen from '../../components/CustomScreen';
import { khaibao } from '../../../types';

type NavigationProp = NativeStackNavigationProp<khaibao>;

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    const cartRef = database().ref(`/cart/${user.uid}`);
    const listener = cartRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value,
        }));
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    });

    return () => cartRef.off('value', listener);
  }, []);

  const updateQuantity = (id: string, amount: number) => {
    const user = auth().currentUser;
    if (!user) return;

    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + amount);

    database()
      .ref(`/cart/${user.uid}/${id}/quantity`)
      .set(newQuantity);
  };

  const removeItem = (id: string) => {
    const user = auth().currentUser;
    if (!user) return;

    database()
      .ref(`/cart/${user.uid}/${id}`)
      .remove();
  };

  const clearCart = async () => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      await database().ref(`/cart/${user.uid}`).remove();
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleCheckout = () => {
    // Process payment logic would go here
    // After successful payment:
    clearCart();
    navigation.navigate('Success', { gia: totalPay });
  };

  const itemsTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const discount = -1000;
  const taxRate = 0.08;
  const delivery = itemsTotal > 40000 ? 0 : 3000;
  const tax = parseFloat((itemsTotal * taxRate).toFixed(2));
  const totalPay = itemsTotal + discount + tax + delivery;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
      </View>
      <View style={styles.qtyContainer}>
        <TouchableOpacity 
          style={styles.qtyButton} 
          onPress={() => updateQuantity(item.id, -1)}
        >
          <Ionicons name="remove" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.qtyButton} 
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => removeItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <CustomScreen>
      <TitleTop2 
        icon="arrow-back-outline" 
        title="Giỏ hàng" 
        onPress={() => navigation.goBack()}
      />
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#e0e0e0" />
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Chi tiết hóa đơn</Text>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tạm tính:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(itemsTotal)}</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Giảm giá:</Text>
                  <Text style={styles.discountValue}>{formatCurrency(discount)}</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Thuế (8%):</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(delivery)}</Text>
                </View>
                
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Tổng cộng:</Text>
                  <Text style={styles.totalValue}>{formatCurrency(totalPay)}</Text>
                </View>
              </View>
            }
          />

          <View style={styles.checkoutContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Tổng tiền: </Text>
              <Text style={styles.totalAmount}>{formatCurrency(totalPay)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton} 
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </CustomScreen>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#757575',
    marginVertical: 16,
  },
  shopButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Add space for checkout button
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  qtyButton: {
    backgroundColor: '#4CAF50',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  totalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 14,
    color: '#757575',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;