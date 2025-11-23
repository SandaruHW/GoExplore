import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';
import { destinations } from '../destinations.js';
import FeaturedCarousel from './FeaturedCarousel';
import DestinationCard from './DestinationCard';

export default function HomeScreen() {
  const { user, darkMode } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleDestinationPress = (destination) => {
    console.log('Navigate to', destination.name);
  };

  const popularDestinations = destinations.filter((d) => d.badge === 'Popular').slice(0, 5);

  const filteredDestinations = searchQuery
    ? destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : destinations;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#f9fafb' }]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <LinearGradient colors={['#0ea5e9', '#14b8a6']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.userName}>{user.firstName}</Text>
            </View>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search destinations..."
              style={styles.searchInput}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>
          {/* Featured Carousel */}
          <FeaturedCarousel
            destinations={destinations.slice(0, 3)}
            onCardPress={(dest) => console.log('Navigate to', dest.name)}
          />

          {/* Popular Destinations */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#111827' }]}>
                Popular Destinations
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {popularDestinations.map((destination) => (
                <View key={destination.id} style={styles.cardWrapper}>
                  <DestinationCard
                    destination={destination}
                    onPress={() => handleDestinationPress(destination)}
                    compact
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* All Destinations */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#111827' }]}>
              {searchQuery ? 'Search Results' : 'Explore Destinations'}
            </Text>
            <View style={styles.destinationsList}>
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onPress={() => handleDestinationPress(destination)}
                />
              ))}
            </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    color: '#0ea5e9',
    fontWeight: '500',
    fontSize: 14,
  },
  horizontalScroll: {
    marginBottom: 8,
  },
  cardWrapper: {
    width: 256,
    marginRight: 16,
  },
  destinationsList: {
    gap: 16,
  },
});
