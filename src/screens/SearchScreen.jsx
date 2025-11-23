import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';
import { destinations } from '../destinations';

const categories = [
  { id: 'all', name: 'All', icon: 'compass' },
  { id: 'City', name: 'Cities', icon: 'home' },
  { id: 'Beach', name: 'Beaches', icon: 'sun' },
  { id: 'Mountain', name: 'Mountains', icon: 'triangle' },
  { id: 'Nature', name: 'Nature', icon: 'map-pin' },
];

export default function SearchScreen() {
  const { darkMode } = useAppContext();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      !searchQuery ||
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || destination.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#f9fafb' }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient colors={['#0ea5e9', '#14b8a6']} style={styles.header}>
          <Text style={styles.headerTitle}>Search Destinations</Text>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Where do you want to go?"
              style={styles.searchInput}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>
          {/* Categories */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#111827' }]}>
              Categories
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.id)}
                    style={[
                      styles.categoryButton,
                      isSelected && styles.categoryButtonSelected,
                      { backgroundColor: isSelected ? '#0ea5e9' : darkMode ? '#1f2937' : '#fff' },
                    ]}
                  >
                    <Feather name={category.icon} size={18} color={isSelected ? '#fff' : darkMode ? '#9ca3af' : '#6b7280'} />
                    <Text style={[styles.categoryText, { color: isSelected ? '#fff' : darkMode ? '#9ca3af' : '#6b7280' }]}> 
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Results */}
          <View style={styles.section}>
            <View style={styles.resultsHeader}>
              <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#111827' }]}>
                {searchQuery ? 'Search Results' : 'All Destinations'}
              </Text>
              <Text style={[styles.resultsCount, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                {filteredDestinations.length} found
              </Text>
            </View>

            {filteredDestinations.length > 0 ? (
              <View style={styles.grid}>
                {filteredDestinations.map((destination) => (
                  <TouchableOpacity
                    key={destination.id}
                    onPress={() => navigation.navigate('DestinationDetail', { id: destination.id })}
                    style={[styles.gridItem, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}
                  >
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: destination.image }} style={styles.gridImage} />
                      <View style={styles.overlay} />
                      <View style={styles.gridContent}>
                        <Text style={styles.gridName} numberOfLines={1}>
                          {destination.name}
                        </Text>
                        <View style={styles.gridLocation}>
                          <Feather name="map-pin" size={10} color="#fff" />
                          <Text style={styles.gridLocationText} numberOfLines={1}>
                            {destination.country}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Feather name="search" size={48} color={darkMode ? '#6b7280' : '#9ca3af'} />
                <Text style={[styles.emptyText, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                  No destinations found. Try a different search.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 24,
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  searchInput: {
    width: '100%',
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriesScroll: {
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonSelected: {
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 128,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  gridContent: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
  },
  gridName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  gridLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  gridLocationText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});
