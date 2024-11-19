import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainMenuNavigationProp, MainMenuRouteProp } from '../types';
import { useTheme } from '../contexts/ThemeContext';

type Category = {
  id: string;
  name: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};

const categories: Category[] = [
  { id: '1', name: 'Servicios', icon: 'build' },
  { id: '2', name: 'Restaurantes', icon: 'restaurant' },
  { id: '3', name: 'Tiendas', icon: 'storefront' },
  { id: '4', name: 'Salud', icon: 'medical' },
  { id: '5', name: 'Educación', icon: 'school' },
];

type MainMenuProps = {
  userData: {
    userType: 'CLIENTE' | 'EMPRESA';
    nombre: string;
  } | null;
  isLoading: boolean;
  loadUserData: (userType: 'CLIENTE' | 'EMPRESA') => Promise<void>;
};

export default function MainMenu({ userData, isLoading, loadUserData }: MainMenuProps) {
  const navigation = useNavigation<MainMenuNavigationProp>();
  const route = useRoute<MainMenuRouteProp>();
  const { theme, isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (!userData && !isLoading) {
      loadUserData(route.params.userType);
    }
  }, [userData, isLoading, loadUserData, route.params.userType]);

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[styles.categoryButton, { backgroundColor: theme.colors.card }]}
      onPress={() => {
        if (item.name === 'Servicios') {
          navigation.navigate('ServicesMenu');
        } else {
          navigation.navigate('ServiceList', { category: item.name });
        }
      }}
    >
      <Ionicons name={item.icon} size={40} color={theme.colors.primary} />
      <Text style={[styles.categoryText, { color: theme.colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    navigation.navigate('UserTypeSelection');
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Cargando datos del usuario...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>Error al cargar los datos del usuario.</Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => loadUserData(route.params.userType)}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
        Bienvenido, {userData.nombre}
      </Text>
      <View style={styles.themeToggle}>
        <Text style={[styles.themeText, { color: theme.colors.text }]}>Modo Oscuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: theme.colors.primary }}
          thumbColor={isDarkMode ? theme.colors.background : "#f4f3f4"}
        />
      </View>
      <Text style={[styles.title, { color: theme.colors.text }]}>Categorías</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.categoriesContainer}
      />
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  themeText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoriesContainer: {
    alignItems: 'center',
  },
  categoryButton: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});