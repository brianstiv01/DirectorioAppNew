import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { ServicesMenuNavigationProp } from '../types';

type Service = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const services: Service[] = [
  { id: '1', name: 'Cerrajería', icon: 'key-outline' },
  { id: '2', name: 'Plomería', icon: 'water-outline' },
  { id: '3', name: 'Electricidad', icon: 'flash-outline' },
  { id: '4', name: 'Carpintería', icon: 'hammer-outline' },
  { id: '5', name: 'Limpieza', icon: 'sparkles-outline' },
];

const ServicesMenu = () => {
  const navigation = useNavigation<ServicesMenuNavigationProp>();
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Servicios Disponibles</Text>
      {services.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={[styles.serviceButton, { backgroundColor: theme.colors.card }]}
          onPress={() => navigation.navigate('ServiceList', { category: service.name })}
        >
          <Ionicons name={service.icon} size={24} color={theme.colors.primary} style={styles.icon} />
          <Text style={[styles.serviceText, { color: theme.colors.text }]}>{service.name}</Text>
        </TouchableOpacity>
      ))}
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
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  serviceText: {
    fontSize: 18,
  },
});

export default ServicesMenu;