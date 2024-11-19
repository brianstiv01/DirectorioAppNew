import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTheme } from '../contexts/ThemeContext';

const companyData = {
  id: '1',
  name: 'Cerrajería 24/7',
  logo: require('../Images/Logos/Logo1.png'),
  coverImage: require('../Images/Portadas/Portada1.jpg'),
  rating: 4.5,
  description: 'Somos expertos en servicios de cerrajería, disponibles las 24 horas del día, los 7 días de la semana. Ofrecemos soluciones rápidas y confiables para todas sus necesidades de seguridad.',
  schedule: {
    open: '00:00',
    close: '23:59',
    is24Hours: true,
  },
  phone: '+573001234567',
  whatsapp: '+573001234567',
  gallery: [
    require('../Images/Galeria/Galeria1.jpg'),
    require('../Images/Galeria/Galeria2.jpg'),
    require('../Images/Galeria/Galeria3.jpg'),
    require('../Images/cerrajeria.png'),
  ],
};

export default function CompanyDetail() {
  const [isSaved, setIsSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const checkIfOpen = () => {
    if (companyData.schedule.is24Hours) {
      setIsOpen(true);
      return;
    }

    const now = new Date();
    const currentTime = format(now, 'HH:mm');
    const [openHour, openMinute] = companyData.schedule.open.split(':');
    const [closeHour, closeMinute] = companyData.schedule.close.split(':');

    const openTime = new Date(now.setHours(Number(openHour), Number(openMinute), 0));
    const closeTime = new Date(now.setHours(Number(closeHour), Number(closeMinute), 0));

    setIsOpen(now >= openTime && now < closeTime);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Aquí iría la lógica para guardar la empresa en favoritos
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `¡Mira esta empresa! ${companyData.name}`,
        url: 'https://tuapp.com/empresa/' + companyData.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${companyData.whatsapp}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${companyData.phone}`);
  };

  const renderGalleryItem = ({ item }) => (
    <Image source={item} style={styles.galleryImage} />
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Image source={companyData.coverImage} style={styles.coverImage} />
        <View style={styles.overlay} />
        <View style={styles.headerContent}>
          <Text style={styles.companyName}>{companyData.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{companyData.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.logoAndActionContainer}>
        <View style={styles.logoContainer}>
          <Image source={companyData.logo} style={styles.logo} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size={24} color={theme.colors.primary} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>{isSaved ? 'Guardado' : 'Guardar'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color={theme.colors.primary} />
            <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Compartir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.scheduleContainer}>
          <Ionicons name="time-outline" size={20} color={isOpen ? "#4CAF50" : "#F44336"} />
          <Text style={[styles.scheduleText, { color: isOpen ? "#4CAF50" : "#F44336" }]}>
            {isOpen ? 'Abierto' : 'Cerrado'} • {companyData.schedule.is24Hours ? '24 horas' : `${companyData.schedule.open} - ${companyData.schedule.close}`}
          </Text>
        </View>

        <Text style={[styles.description, { color: theme.colors.text }]}>{companyData.description}</Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Galería</Text>
        <FlatList
          data={companyData.gallery}
          renderItem={renderGalleryItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.contactButtons}>
        <TouchableOpacity style={[styles.contactButton, styles.whatsappButton]} onPress={handleWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color="white" />
          <Text style={styles.contactButtonText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.contactButton, styles.callButton]} onPress={handleCall}>
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.contactButtonText}>Llamar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContent: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
    color: 'white',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  logoAndActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -30,
    paddingHorizontal: 16,
  },
  logoContainer: {
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 4,
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionButtonText: {
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleText: {
    marginLeft: 8,
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  callButton: {
    backgroundColor: '#007AFF',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});