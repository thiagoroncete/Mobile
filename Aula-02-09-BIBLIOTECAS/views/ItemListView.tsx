import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Item } from '../models/ItemModel';

interface Props {
  items: Item[];
  onItemPress: (item: Item) => void;
}

export const ItemListView: React.FC<Props> = ({ items, onItemPress }) => {
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      )}
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        {!item.imageUri && (
          <Text style={styles.noImageText}>Sem imagem</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6200EE',
    elevation: 2,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  noImageText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
