import React from 'react';
import { FlatList } from 'react-native';
import { Card, List } from 'react-native-paper';
import { Item } from '../models/ItemModel';

interface Props {
  items: Item[];
  onItemPress: (item: Item) => void;
}

export const ItemListView: React.FC<Props> = ({ items, onItemPress }) => {
  const renderItem = ({ item }: { item: Item }) => (
    <Card
      style={{
        marginBottom: 10,
        backgroundColor: '#e3f2fd'
      }}
      onPress={() => onItemPress(item)}
    >
      <List.Item
        title={item.title}
        titleStyle={{ color: '#2e7d32' }} // 🟢 texto verde
        left={props => <List.Icon {...props} icon="folder" />}
      />
    </Card>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};
