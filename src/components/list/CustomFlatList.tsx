import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Item {
  id: string;
  name: string;
  image: any
}

interface Props {
  data: Item[];
  numColumns?: number;
  onPressItem?: (item: Item) => void;
}


const CustomFlatList = ({ data, numColumns = 2, onPressItem }: Props) => {
  
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => onPressItem && onPressItem(item)}
    >
        <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    width: '48%',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default CustomFlatList;