import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type UserTypeSelectionNavigationProp = StackNavigationProp<RootStackParamList, 'UserTypeSelection'>;

const UserTypeSelection: React.FC = () => {
  const navigation = useNavigation<UserTypeSelectionNavigationProp>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleUserTypeSelection = (userType: 'CLIENTE' | 'EMPRESA') => {
    console.log(`Usuario seleccionó: ${userType}`);
    // Por ahora, solo registramos la selección
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Bienvenido a FINDERCOL</Text>
      <Text style={styles.subtitle}>¿Cómo deseas utilizar la aplicación?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUserTypeSelection('CLIENTE')}
        >
          <Text style={styles.buttonText}>Como Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUserTypeSelection('EMPRESA')}
        >
          <Text style={styles.buttonText}>Como Empresa</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default UserTypeSelection;