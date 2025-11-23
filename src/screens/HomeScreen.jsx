import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { destinations } from '../destinations.js';
import FeaturedCarousel from './FeaturedCarousel';
import DestinationCard from './DestinationCard';
import DestinationModal from '../components/DestinationModal';

export default function HomeScreen() {
  const { user, darkMode } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleDestinationPress = (destination) => {
    setSelectedDestination(destination);
    setModalVisible(true);
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
          <View style={styles.headerContent}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome back! 👋</Text>
                <Text style={styles.userName}>{user?.firstName || 'Traveler'}</Text>
              </View>
              <View style={styles.avatarWrapper}>
                <Image 
                  source={{ uri: user?.avatar || 'https://www.shutterstock.com/image-vector/default-avatar-social-media-display-600nw-2632690107.jpg' }} 
                  style={styles.avatar} 
                />
                <View style={styles.avatarBadge}>
                  <Feather name="map" size={12} color="#fff" />
                </View>
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Places</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>42</Text>
                <Text style={styles.statLabel}>Photos</Text>
              </View>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <Feather name="search" size={20} color="#0ea5e9" />
            </View>
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
            onCardPress={(dest) => handleDestinationPress(dest)}
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
      <DestinationModal
        visible={modalVisible}
        destination={selectedDestination}
        onClose={() => setModalVisible(false)}
      />
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
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerContent: {
    marginBottom: 20,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  userName: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  avatarWrapper: {
    position: 'relative',
    marginLeft: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 8,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderRadius: 12,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  searchInput: {
    width: '100%',
    paddingLeft: 60,
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
