import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import firestore from '@react-native-firebase/firestore';
import { RootStackParamList } from '../types';

type CompanyRegistrationNavigationProp = StackNavigationProp<RootStackParamList, 'CompanyRegistration'>;

const CompanyRegistration: React.FC = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    nit: '',
    email: '',
    phoneFixed: '',
    phoneCell: '',
    address: '',
    type: '',
    subtype: '',
    description: '',
  });
  const navigation = useNavigation<CompanyRegistrationNavigationProp>();
  const { theme } = useTheme();

  const handleInputChange = (field: string, value: string) => {
    setCompanyData({ ...companyData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await firestore().collection('companies').add(companyData);
      Alert.alert('Éxito', 'Empresa registrada correctamente');
      navigation.navigate('MainMenu', { userType: 'EMPRESA' });
    } catch (error) {
      console.error('Error al registrar la empresa:', error);
      Alert.alert('Error', 'No se pudo registrar la empresa. Por favor, intente de nuevo.');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Registro de Empresa</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Nombre de la empresa o razón social"
        placeholderTextColor={theme.colors.text}
        value={companyData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="NIT (Este dato no será mostrado al público)"
        placeholderTextColor={theme.colors.text}
        value={companyData.nit}
        onChangeText={(text) => handleInputChange('nit', text)}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Email"
        placeholderTextColor={theme.colors.text}
        value={companyData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Teléfono fijo"
        placeholderTextColor={theme.colors.text}
        value={companyData.phoneFixed}
        onChangeText={(text) => handleInputChange('phoneFixed', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Teléfono celular (Preferiblemente con WhatsApp)"
        placeholderTextColor={theme.colors.text}
        value={companyData.phoneCell}
        onChangeText={(text) => handleInputChange('phoneCell', text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.colors.card, color: theme.colors.text }]}
        placeholder="Dirección (Opcional)"
        placeholderTextColor={theme.colors.text}
        value={companyData.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Registrar Empresa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default CompanyRegistration;