import React, { ReactNode } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

interface CustomScreenProps {
  children: ReactNode;
}

const CustomScreen = ({ children }: CustomScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Màu nền tùy chỉnh
  },
  container: {
    flex: 1,
    marginTop: 15, // Thêm margin top 15
    paddingHorizontal: 16, // Padding ngang (tuỳ chọn)
  },
});

export default CustomScreen;