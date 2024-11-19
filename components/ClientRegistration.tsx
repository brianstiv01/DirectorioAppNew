import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import firebase from '../firebase';

const ClientRegistration: React.FC = () => {
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleInputChange = (field: string, value: string) => {
    setClientData({ ...clientData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await firebase.firestore().collection('clients').add(clientData);
      Alert.alert('Éxito', 'Cliente registrado correctamente');
      navigation.navigate('MainMenu', { userType: 'CLIENTE' });
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
      Alert.alert('Error', 'No se pudo registrar el cliente. Por favor, intente de nuevo.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Registro de Cliente</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Nombre completo"
        placeholderTextColor={theme.colors.text}
        value={clientData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Email"
        placeholderTextColor={theme.colors.text}
        value={clientData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Teléfono"
        placeholderTextColor={theme.colors.text}
        value={clientData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
        keyboardType="phone-pad"
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ClientRegistration;