import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ItemService } from './services/ItemService';
import { ItemController } from './controllers/ItemController';
import { ItemListView } from './views/ItemListView';
import { ItemModalView } from './views/ItemModalView';
import { Item } from './models/ItemModel';

export default function App() {
  const service = new ItemService();
  const controller = new ItemController(service);

  const [items, setItems] = useState<Item[]>(controller.getItems());
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [inputText, setInputText] = useState('');

  const openAddModal = () => { setEditingItem(null); setInputText(''); setModalVisible(true); };
  const openEditModal = (item: Item) => { setEditingItem(item); setInputText(item.title); setModalVisible(true); };
  const closeModal = () => { setModalVisible(false); setEditingItem(null); setInputText(''); };

  const handleSave = () => {
    let result;
    if (editingItem) {
      result = controller.updateItem(editingItem.id, inputText);
      if (!result) return Alert.alert('Erro', 'Digite um título');
    } else {
      result = controller.addItem(inputText);
      if (!result) return Alert.alert('Erro', 'Digite um título');
    }
    setItems(controller.getItems());
    closeModal();
  };

  const handleDelete = () => {
    if (editingItem) controller.deleteItem(editingItem.id);
    setItems(controller.getItems());
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text>Adicionar Item</Text>
      </TouchableOpacity>

      <ItemListView items={items} onItemPress={openEditModal} />

      <ItemModalView
        visible={modalVisible}
        item={editingItem}
        inputText={inputText}
        onChangeText={setInputText}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={editingItem ? handleDelete : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  addButton: { backgroundColor: '#ddd', padding: 10, marginBottom: 20, alignItems: 'center' },
});
