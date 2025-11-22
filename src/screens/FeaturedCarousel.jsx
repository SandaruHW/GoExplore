import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../AppContext';

export default function FeaturedCarousel() {
  const { darkMode } = useAppContext();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0ea5e9', '#14b8a6']} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>Discover Amazing Places</Text>
          <Text style={styles.subtitle}>Explore the world with GoExplore</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop' }}
          style={styles.image}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0f2fe',
  },
  image: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },
});