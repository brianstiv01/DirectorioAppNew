import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BusinessCard({ business }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = new Animated.Value(0);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity onPress={flipCard}>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.businessDescription}>{business.description}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        <TouchableOpacity style={styles.contactButton} onPress={() => {}}>
          <Icon name="whatsapp" size={30} color="green" />
          <Text style={styles.contactText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={() => {}}>
          <Icon name="phone" size={30} color="#007AFF" />
          <Text style={styles.contactText}>Llamar</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  businessDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 18,
  },
});