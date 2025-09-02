import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Button, Appbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { ItemService } from './services/ItemService';
import { ItemController } from './controllers/ItemController';
import { ItemListView } from './views/ItemListView';
import { ItemModalView } from './views/ItemModalView';
import { CameraViewComponent } from './views/CameraView';
import { Item } from './models/ItemModel';

export default function App() {
  const service = new ItemService();
  const controller = new ItemController(service);

  const [items, setItems] = useState<Item[]>(controller.getItems());
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [inputText, setInputText] = useState('');
  const [cameraVisible, setCameraVisible] = useState(false);

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

  const handlePhotoTaken = (uri: string) => {
    console.log('Foto tirada:', uri);
    Alert.alert('Sucesso', 'Foto capturada com sucesso!');
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Lista de Itens" />
      </Appbar.Header>

      <View style={styles.container}>
        <Button
          mode="contained"
          icon="plus"
          onPress={openAddModal}
          style={styles.addButton}
        >
          Adicionar Item
        </Button>

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

        <CameraViewComponent
          visible={cameraVisible}
          onClose={() => setCameraVisible(false)}
          onPhotoTaken={handlePhotoTaken}
        />

        <TouchableOpacity
          style={styles.cameraIcon}
          onPress={() => setCameraVisible(true)}
        >
          <MaterialIcons name="photo-camera" size={48} color="#6200ee" />
        </TouchableOpacity>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  addButton: { marginBottom: 20 },
  cameraIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    elevation: 5, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
