import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const cities = [
  "Ciudad de México",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Tijuana",
  "León",
  "Juárez",
  "Zapopan",
  "Mérida",
  "San Luis Potosí"
];

export default function CitySelector({ onSelectCity }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Seleccionar Ciudad');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalVisible(false);
    onSelectCity(city);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>{selectedCity}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Selecciona tu ciudad</Text>
            <FlatList
              data={cities}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => handleCitySelect(item)}
                >
                  <Text style={styles.cityText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    width: '100%',
  },
  cityText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});