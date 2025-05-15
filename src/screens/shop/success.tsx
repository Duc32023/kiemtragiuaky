import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import CustomScreen from '../../components/CustomScreen';
import { khaibao } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TitleTop2 from '../../components/title/TitleTop2';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Button1 from '../../components/button/Button1';
import ButtonIcon from '../../components/button/ButtonIcon';
type NavigationProp = NativeStackNavigationProp<khaibao>;
type DetailRouteProp = RouteProp<khaibao, 'Success'>;

const SuccessScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { gia } = route.params;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <CustomScreen>
            <TitleTop2 
                title="Đặt hàng thành công"
                icon="arrow-back-outline"
                onPress={() => navigation.navigate('Home')}
            />
            
            <View style={styles.contentContainer}>
                <View style={styles.successIcon}>
                    <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                </View>
                
                <Text style={styles.thankYouText}>
                    Cảm ơn bạn đã đặt hàng!
                </Text>
                
                <Text style={styles.messageText}>
                    Đơn hàng của bạn đã được tiếp nhận và đang được xử lý. Chúng tôi sẽ liên hệ với bạn sớm để xác nhận.
                </Text>
                
                <View style={styles.orderSummary}>
                    <Text style={styles.summaryTitle}>Thông tin đơn hàng</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tổng thanh toán:</Text>
                        <Text style={styles.summaryValue}>{formatCurrency(gia)}</Text>
                    </View>
                </View>
                
                <View style={styles.buttonGroup}>
                    <ButtonIcon 
                        icon="car-sport-outline"
                        text="Theo dõi đơn hàng"
                        // onPress={() => navigation.navigate('OrderTracking')}
                        style={styles.trackButton}
                        // textStyle={styles.trackButtonText}
                    />
                    <ButtonIcon
                        icon="home-outline"
                        text="Về trang chủ"
                        onPress={() => navigation.navigate('Home')}
                        style={styles.homeButton}
                    />
                </View>
            </View>
        </CustomScreen>
    )
}

export default SuccessScreen

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    successIcon: {
        marginBottom: 30,
    },
    thankYouText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    messageText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    orderSummary: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    buttonGroup: {
        width: '100%',
    },
    trackButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#4CAF50',
        marginBottom: 15,
    },
    trackButtonText: {
        color: '#4CAF50',
    },
    homeButton: {
        backgroundColor: '#4CAF50',
    },
});