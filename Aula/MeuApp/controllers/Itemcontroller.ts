import { Item } from '../models/Item';
import { Alert } from 'react-native';

export class ItemController {
  addItem() {
    if (!inputText.trim()) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }

    const newItem: Item = {
      id: generateId(),
      title: inputText.trim(),
    };

    setItems([...items, newItem]);
    closeModal();
  }

  updateItem() {
    if (!inputText.trim() || !editingItem) {
      Alert.alert('Erro', 'Digite um título');
      return;
    }

    setItems(items.map(item =>
      item.id === editingItem.id
        ? { ...item, title: inputText.trim() }
        : item
    ));
    closeModal();
  }

  deleteItem() {
    if (!editingItem) return;

    setItems(items.filter(item => item.id !== editingItem.id));
    closeModal();
  }

  generateId() {
    return Date.now().toString();
  }
}
