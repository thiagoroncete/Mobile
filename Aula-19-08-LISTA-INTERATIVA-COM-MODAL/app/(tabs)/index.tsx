import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Item {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  const adicionarItem = () => {
    if (titulo.trim() && descricao.trim() && imagem.trim()) {
      const novoItem: Item = {
        id: Date.now().toString(),
        titulo,
        descricao,
        imagem,
      };
      setItems([...items, novoItem]);
      setTitulo("");
      setDescricao("");
      setImagem("");
      setModalVisible(false);
    }

  };
   const fecharModal = () => {
      setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      {item.imagem ? (
        <Image source={{ uri: item.imagem }} style={styles.imagem} />
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textoBotao}>Adicionar item</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Novo Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor= "#000"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor= "#000"
              value={descricao}
              onChangeText={setDescricao}
            />
            <TextInput
              style={styles.input}
              placeholder="URL da imagem"
              placeholderTextColor= "#000"
              value={imagem}
              onChangeText={setImagem}
            />

            <TouchableOpacity style={styles.botaoConfirmar} onPress={adicionarItem}>
              <Text style={styles.textoBotao}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCancelar} onPress={fecharModal}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  lista: { padding: 16 },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  descricao: { fontSize: 14, color: "#555", marginBottom: 6 },
  imagem: { width: "100%", height: 150, borderRadius: 8 },
  botaoAdicionar: {
    backgroundColor: "#007BFF",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalConteudo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  botaoConfirmar: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  botaoCancelar: {
    backgroundColor: "#ff0000ff",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
});
