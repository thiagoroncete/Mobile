import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, IconButton, Portal, Modal } from 'react-native-paper';

interface Props {
  visible: boolean;
  onClose: () => void;
  onPhotoTaken: (uri: string) => void;
}

export const CameraViewComponent: React.FC<Props> = ({ visible, onClose, onPhotoTaken }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        onPhotoTaken(photo.uri);
        onClose();
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível tirar a foto');
      }
    }
  };

  const flipCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.permissionContainer}>
          <Button mode="contained" onPress={onClose}>
            Sem permissão para acessar a câmera
          </Button>
        </Modal>
      </Portal>
    );
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <IconButton
                icon="close"
                size={30}
                iconColor="white"
                style={styles.closeButton}
                onPress={onClose}
              />
              <IconButton
                icon="camera-flip"
                size={30}
                iconColor="white"
                style={styles.flipButton}
                onPress={flipCamera}
              />
            </View>
          </CameraView>
          
          <View style={styles.controlsContainer}>
            <IconButton
              icon="camera"
              size={50}
              iconColor="white"
              style={styles.captureButton}
              onPress={takePicture}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: '#ddd',
  },
  permissionContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});
