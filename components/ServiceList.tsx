import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type Service = {
  id: string;
  name: string;
  logo: any;
  image: any;
  rating: number;
  description: string;
  promo: string;
};

type RootStackParamList = {
  ServiceList: { category: string };
  CompanyDetail: { companyId: string };
};

type ServiceListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceList'>;

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Cerrajería 24/7',
    logo: require('../Images/Logos/Logo1.png'),
    image: require('../Images/Portadas/Portada1.jpg'),
    rating: 4.5,
    description: 'Servicio de cerrajería las 24 horas',
    promo: 'Envío gratis y 20% de descuento',
  },
  {
    id: '2',
    name: 'Cerrajería Express',
    logo: require('../Images/Logos/Logo2.jpg'),
    image: require('../Images/Portadas/Portada2.jpg'),
    rating: 4.8,
    description: 'Servicio rápido y confiable',
    promo: 'Primera visita con 15% de descuento',
  },
  {
    id: '3',
    name: 'Cerrajería Segura',
    logo: require('../Images/Logos/Logo3.png'),
    image: require('../Images/Portadas/Portada3.jpg'),
    rating: 4.6,
    description: 'Especialistas en seguridad',
    promo: '10% de descuento en cerraduras',
  },
  {
    id: '4',
    name: 'Llaves Rápidas',
    logo: require('../Images/Logos/Logo4.png'),
    image: require('../Images/Portadas/Portada4.jpg'),
    rating: 4.3,
    description: 'Duplicado de llaves al instante',
    promo: '2x1 en duplicados',
  },
];

export default function ServiceList({ route }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const { category } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<ServiceListScreenNavigationProp>();
  const { theme, isDarkMode } = useTheme();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0.3],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0.7],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    const filtered = mockServices.filter(service =>
      service.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredServices(filtered);
  }, []);

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={[styles.serviceCard, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('CompanyDetail', { companyId: item.id })}
    >
      <View style={styles.serviceHeader}>
        <Image source={item.logo} style={styles.serviceLogo} />
        <View style={styles.serviceHeaderInfo}>
          <Text style={[styles.serviceName, { color: theme.colors.text }]} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </View>
        </View>
      </View>
      <Image
        source={item.image}
        style={styles.serviceImage}
        resizeMode="cover"
      />
      <View style={styles.serviceInfo}>
        <Text style={[styles.serviceDescription, { color: theme.colors.text }]} numberOfLines={2}>{item.description}</Text>
        {item.promo && (
          <Text style={[styles.promoText, { color: theme.colors.primary }]}>{item.promo}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View style={[styles.header, { height: headerHeight, backgroundColor: theme.colors.primary }]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            { opacity: imageOpacity },
          ]}
          source={require('../Images/cerrajeria.png')}
          resizeMode="cover"
        />
        <Animated.View
          style={[
            styles.headerContent,
            {
              transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
            },
          ]}
        >
          <Text style={styles.headerTitle}>{category}</Text>
        </Animated.View>
      </Animated.View>

      <Animated.FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
            <TextInput
              style={[styles.searchInput, { backgroundColor: isDarkMode ? theme.colors.border : theme.colors.background, color: theme.colors.text }]}
              placeholder="Buscar servicio..."
              placeholderTextColor={theme.colors.text}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentInset={{ top: HEADER_MAX_HEIGHT, left: 0, bottom: 0, right: 0 }}
        contentOffset={{ x: 0, y: -HEADER_MAX_HEIGHT }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  headerContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 8,
    paddingTop: HEADER_MAX_HEIGHT + 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: (width - 36) / 2,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  serviceLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  serviceHeaderInfo: {
    flex: 1,
  },
  serviceImage: {
    width: '100%',
    height: 100,
  },
  serviceInfo: {
    padding: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#FFB800',
    fontWeight: 'bold',
  },
  promoText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});