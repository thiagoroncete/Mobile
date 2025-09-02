import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Item } from '../models/ItemModel';

interface Props {
  visible: boolean;
  item: Item | null;
  inputText: string;
  onChangeText: (text: string) => void;
  onClose: () => void;
  onSave: (imageUri?: string) => void;
  onDelete?: () => void;
}

export const ItemModalView: React.FC<Props> = ({ 
  visible, 
  item, 
  inputText, 
  onChangeText, 
  onClose, 
  onSave, 
  onDelete 
}) => {
  const [selectedImage, setSelectedImage] = React.useState<string | undefined>(item?.imageUri);

  React.useEffect(() => {
    setSelectedImage(item?.imageUri);
  }, [item]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  const handleSave = () => {
    onSave(selectedImage);
  };

  const removeImage = () => {
    setSelectedImage(undefined);
  };

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


          <View style={styles.imageSection}>
            <Text style={styles.imageSectionTitle}>Imagem do Item</Text>
            
            {selectedImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                  <Text style={styles.removeImageText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imageButtonsContainer}>
                <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                  <Text style={styles.imageButtonText}>📁 Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                  <Text style={styles.imageButtonText}>📷 Câmera</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            {item && onDelete && (
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
                <Text style={[styles.buttonText, styles.deleteButtonText]}>Excluir</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{item ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  dialog: { 
    backgroundColor: 'white', 
    padding: 24, 
    margin: 20, 
    borderRadius: 16, 
    width: '85%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    textAlign: 'center',
    color: '#6200EE'
  },
  input: { 
    borderWidth: 2, 
    borderColor: '#E8DEF8', 
    padding: 16, 
    marginBottom: 24,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA'
  },
  imageSection: {
    marginBottom: 24,
  },
  imageSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageButton: {
    backgroundColor: '#E8DEF8',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#6200EE',
    fontWeight: '600',
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  removeImageButton: {
    backgroundColor: '#FFEBEE',
    padding: 8,
    borderRadius: 6,
  },
  removeImageText: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: '600',
  },
  buttons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 24 
  },
  button: { 
    backgroundColor: '#E8DEF8', 
    padding: 12, 
    flex: 1, 
    marginHorizontal: 6, 
    alignItems: 'center', 
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  buttonText: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#6200EE'
  },
  deleteButton: { 
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2'
  },
  deleteButtonText: { 
    color: '#D32F2F',
    fontWeight: '600'
  },
});
