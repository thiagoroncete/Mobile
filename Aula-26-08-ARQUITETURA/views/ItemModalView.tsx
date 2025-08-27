import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Item } from '../models/ItemModel';

interface Props {
  visible: boolean;
  item: Item | null;
  inputText: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
}

export const ItemModalView: React.FC<Props> = ({ visible, item, inputText, onChangeText, onClose, onSave, onDelete }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.dialog}>
          <Text style={styles.modalTitle}>{item ? 'Editar Item' : 'Novo Item'}</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o título"
            value={inputText}
            onChangeText={onChangeText}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            {item && onDelete && (
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
                <Text style={[styles.buttonText, styles.deleteButtonText]}>Excluir</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.button} onPress={onSave}>
              <Text style={styles.buttonText}>{item ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  dialog: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 8, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { backgroundColor: '#ddd', padding: 8, flex: 1, marginHorizontal: 4, alignItems: 'center', borderRadius: 4 },
  buttonText: { fontSize: 14, fontWeight: '500' },
  deleteButton: { backgroundColor: '#ffebee' },
  deleteButtonText: { color: '#d32f2f' },
});
