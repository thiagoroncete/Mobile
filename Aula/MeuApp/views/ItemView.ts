import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Item } from '../models/Item';
import { ItemController } from '../controllers/ItemController';

interface ItemViewProps {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export default function ItemView({ items, setItems }: ItemViewProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [inputText, setInputText] = useState('');

  const itemController = new ItemController();

  const closeModal = () => {
    setInputText('');
    setEditingItem(null);
    setModalVisible(false);
  };

  const openAddModal = () => {
    setInputText('');
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item: Item) => {
    setInputText(item.title);
    setEditingItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => openEditModal(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      
      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text>Adicionar Item</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Modal 
        visible={modalVisible} 
        transparent={true} 
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dialog}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Editar Item' : 'Novo Item'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o título"
              value={inputText}
              onChangeText={setInputText}
            />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              {editingItem && (
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => itemController.deleteItem()}>
                  <Text style={[styles.buttonText, styles.deleteButtonText]}>Excluir</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={styles.button} 
                onPress={editingItem ? () => itemController.updateItem() : () => itemController.addItem()}
              >
                <Text style={styles.buttonText}>
                  {editingItem ? 'Salvar' : 'Adicionar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#d32f2f',
  },
});
