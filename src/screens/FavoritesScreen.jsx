import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DestinationModal from '../components/DestinationModal';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';
import { destinations } from '../destinations';
import DestinationCard from './DestinationCard';

export default function FavoritesScreen() {
  const { favorites, darkMode } = useAppContext();
  const [selectedDestination, setSelectedDestination] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const favoriteDestinations = destinations.filter((d) => favorites.includes(d.id));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#f9fafb' }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient colors={['#0ea5e9', '#14b8a6']} style={styles.header}>
          <Text style={styles.headerTitle}>My Favorites</Text>
          <Text style={styles.headerSubtitle}>
            {favoriteDestinations.length} destination{favoriteDestinations.length !== 1 ? 's' : ''}
          </Text>
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>
          {favoriteDestinations.length > 0 ? (
            <View style={styles.destinationsList}>
              {favoriteDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onPress={() => { setSelectedDestination(destination); setModalVisible(true); }}
                />
              ))}
            </View>
          ) : (
            // Empty State
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Feather name="heart" size={40} color="#0ea5e9" />
              </View>
              <Text style={[styles.emptyTitle, { color: darkMode ? '#fff' : '#111827' }]}>
                No favorites yet
              </Text>
              <Text style={[styles.emptyText, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                Start exploring and add destinations to your favorites to see them here!
              </Text>
            </View>
          )}
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  destinationsList: {
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(14,165,233,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
