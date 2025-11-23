import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';

export default function FeaturedCarousel({ destinations, onCardPress }) {
  const { darkMode } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (destinations.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [destinations.length]);

  if (destinations.length === 0) {
    return null;
  }

  const currentDestination = destinations[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: darkMode ? '#fff' : '#111827' }]}>Featured Destinations</Text>

      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={() => onCardPress(currentDestination)} style={styles.imageContainer}>
          <Image source={{ uri: currentDestination.image }} style={styles.image} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.overlay} />

          <View style={styles.content}>
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={16} color="#fff" />
              <Text style={styles.locationText}>{currentDestination.location}</Text>
            </View>
            <Text style={styles.name}>{currentDestination.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {currentDestination.description}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {destinations.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  carouselContainer: {
    position: 'relative',
  },
  imageContainer: {
    height: 256,
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#fff',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
