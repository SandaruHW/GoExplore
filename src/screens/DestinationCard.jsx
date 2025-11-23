import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';

export default function DestinationCard({ destination, onPress, compact }) {
  const { isFavorite, toggleFavorite, darkMode } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoritePress = () => {
    toggleFavorite(destination.id);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const favorited = isFavorite(destination.id);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: destination.image }} style={[styles.image, compact && styles.compactImage]} />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={styles.overlay} />

        {/* Country Badge (hidden for Sri Lanka) */}
        {destination.country && destination.country !== 'Sri Lanka' && (
          <View style={styles.countryBadge}>
            <Feather name="map-pin" size={14} color="#0ea5e9" />
            <Text style={styles.countryText}>{destination.country}</Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity onPress={handleFavoritePress} style={[styles.favoriteButton, isAnimating && styles.animating]}>
          <Feather name="heart" size={20} color={favorited ? '#ef4444' : '#6b7280'} />
        </TouchableOpacity>

        {/* Badge */}
        {destination.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{destination.badge}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.name, { color: darkMode ? '#fff' : '#111827' }]}>
          {destination.name}
        </Text>
        <Text style={[styles.description, { color: darkMode ? '#9ca3af' : '#6b7280' }]} numberOfLines={2}>
          {destination.description}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#f59e0b" />
          <Text style={[styles.rating, { color: darkMode ? '#fff' : '#111827' }]}>
            {destination.rating}
          </Text>
          <Text style={[styles.reviews, { color: darkMode ? '#6b7280' : '#9ca3af' }]}>
            ({destination.reviews.toLocaleString()})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 224,
  },
  compactImage: {
    height: 160,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  countryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  countryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 6,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  animating: {
    transform: [{ scale: 1.1 }],
  },
  badge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#14b8a6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  reviews: {
    fontSize: 14,
    marginLeft: 4,
  },
});
