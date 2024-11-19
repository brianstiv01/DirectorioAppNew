import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const departamentos = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca",
  "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta",
  "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander",
  "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
];

// Simulación de ciudades por departamento (deberías tener una lista completa)
const ciudadesPorDepartamento = {
  "Antioquia": ["Medellín", "Bello", "Envigado"],
  "Cundinamarca": ["Bogotá", "Soacha", "Zipaquirá"],
  // ... otros departamentos y sus ciudades
};

const servicios = ["Servicios", "Restaurantes", "Tiendas", "Salud", "Educación"];

export default function AuthScreen({ onAuthenticate }) {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    departamento: '',
    ciudad: '',
    empresa: '',
    nit: '',
    telefonos: [''],
    whatsapp: '',
    correo: '',
    servicio: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const addPhoneNumber = () => {
    setFormData(prevState => ({
      ...prevState,
      telefonos: [...prevState.telefonos, '']
    }));
  };

  const handlePhoneChange = (index, value) => {
    const newTelefonos = [...formData.telefonos];
    newTelefonos[index] = value;
    setFormData(prevState => ({ ...prevState, telefonos: newTelefonos }));
  };

  const handleSubmit = () => {
    onAuthenticate(userType, formData);
  };

  const renderUserForm = () => (
    <>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formData.nombre}
        onChangeText={(value) => handleInputChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={formData.apellido}
        onChangeText={(value) => handleInputChange('apellido', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número telefónico"
        value={formData.telefono}
        onChangeText={(value) => handleInputChange('telefono', value)}
        keyboardType="phone-pad"
      />
      <Picker
        selectedValue={formData.departamento}
        onValueChange={(value) => handleInputChange('departamento', value)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione Departamento" value="" />
        {departamentos.map((dep) => (
          <Picker.Item key={dep} label={dep} value={dep} />
        ))}
      </Picker>
      {formData.departamento && (
        <Picker
          selectedValue={formData.ciudad}
          onValueChange={(value) => handleInputChange('ciudad', value)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione Ciudad" value="" />
          {ciudadesPorDepartamento[formData.departamento]?.map((ciudad) => (
            <Picker.Item key={ciudad} label={ciudad} value={ciudad} />
          ))}
        </Picker>
      )}
    </>
  );

  const renderCompanyForm = () => (
    <>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa o razón social"
        value={formData.empresa}
        onChangeText={(value) => handleInputChange('empresa', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="NIT"
        value={formData.nit}
        onChangeText={(value) => handleInputChange('nit', value)}
        keyboardType="number-pad"
      />
      {formData.telefonos.map((telefono, index) => (
        <View key={index} style={styles.phoneContainer}>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder={`Número telefónico ${index + 1}`}
            value={telefono}
            onChangeText={(value) => handlePhoneChange(index, value)}
            keyboardType="phone-pad"
          />
          {index === formData.telefonos.length - 1 && (
            <TouchableOpacity onPress={addPhoneNumber} style={styles.addButton}>
              <Icon name="add" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Número de WhatsApp"
        value={formData.whatsapp}
        onChangeText={(value) => handleInputChange('whatsapp', value)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={formData.correo}
        onChangeText={(value) => handleInputChange('correo', value)}
        keyboardType="email-address"
      />
      <Picker
        selectedValue={formData.servicio}
        onValueChange={(value) => handleInputChange('servicio', value)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione el servicio que ofrece" value="" />
        {servicios.map((servicio) => (
          <Picker.Item key={servicio} label={servicio} value={servicio} />
        ))}
      </Picker>
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido al Directorio de Servicios</Text>
      {!userType ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUserType('CLIENTE')}
          >
            <Text style={styles.buttonText}>CLIENTE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUserType('EMPRESA')}
          >
            <Text style={styles.buttonText}>EMPRESA</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {userType === 'CLIENTE' ? renderUserForm() : renderCompanyForm()}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  phoneInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    padding: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});