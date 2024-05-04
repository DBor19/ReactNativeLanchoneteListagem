import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [items, setItems] = useState([])
  const [visivel, setVisivel] = useState(false)

  async function buscar(){
    try {
      const resposta = await axios.get("http://192.168.15.10:3000/produtos")
      setItems(resposta.data)

    } catch (error) {
      console.log("Error" + error)
    }
  }


  return (
    <View style={styles.container}>
      
      <Text>Lanchonete:</Text>
      <Button 
        title='click'
        onPress={() => {
          buscar() 
          setVisivel(!visivel)
        }}
      />

      <Modal
        animationType='fade'
        visible={visivel}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <FlatList 
              data={items}
              keyExtractor={item => item.id}
              renderItem={({item})=>(
                <>
                  <Text>{item.id}</Text>
                  <Text>{item.nome}</Text>
                  <Text>{item.descricao}</Text>
                  <Text>R$ {item.preco}</Text>
                  <Text></Text>
                </>
              )}
            />
            <Button 
              title='Fechar'
              onPress={() => setVisivel(!visivel)}
            />
          </View>
        </View>
      </Modal>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },

  modal:{
    width: 300,
    height: 500,
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  }
});
