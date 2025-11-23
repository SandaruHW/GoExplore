import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ScrollView, TouchableWithoutFeedback, Animated, Easing, Share, Linking, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';
let BlurView = null;
try {
  // use dynamic require so app won't crash if expo-blur isn't installed
  // users can install it with `expo install expo-blur` for native blur support
  // eslint-disable-next-line global-require
  BlurView = require('expo-blur').BlurView;
} catch (e) {
  BlurView = null;
}

export default function DestinationModal({ visible, destination, onClose }) {
  const { darkMode, toggleFavorite, isFavorite } = useAppContext();

  const [showModal, setShowModal] = useState(visible);
  const anim = useRef(new Animated.Value(0)).current; // 0 hidden, 1 visible

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true, easing: Easing.out(Easing.cubic) }).start();
    } else if (showModal) {
      // animate out then hide
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true, easing: Easing.in(Easing.cubic) }).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  if (!destination) return null;
  if (!showModal) return null;

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });
  const opacity = anim;

  const handleRequestClose = () => {
    // animate out and then call onClose
    Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true, easing: Easing.in(Easing.cubic) }).start(() => {
      setShowModal(false);
      if (onClose) onClose();
    });
  };

  const handleShare = async () => {
    try {
      const message = `${destination.name} — ${destination.description || ''}`;
      const url = destination.image;
      await Share.share({ message: `${message}\n\n${url}` });
    } catch (e) {
      // ignore
    }
  };

  const handleOpenMaps = async () => {
    const query = encodeURIComponent(`${destination.name} ${destination.location || ''} ${destination.country || ''}`.trim());
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    try {
      const can = await Linking.canOpenURL(googleUrl);
      if (can) Linking.openURL(googleUrl);
      else {
        // fallback to generic
        Linking.openURL(`geo:0,0?q=${query}`);
      }
    } catch (e) {
      // ignore
    }
  };

  

  return (
    <Modal visible={showModal} transparent onRequestClose={handleRequestClose} animationType="none">
      <TouchableWithoutFeedback onPress={handleRequestClose}>
        <View style={styles.overlay}>
          {BlurView ? (
            <BlurView intensity={80} tint={darkMode ? 'dark' : 'light'} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: darkMode ? 'rgba(2,6,23,0.6)' : 'rgba(255,255,255,0.6)' }]} />
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.centeredContainer} pointerEvents="box-none">
        <Animated.View style={[styles.card, { backgroundColor: darkMode ? '#0b1220' : '#fff', transform: [{ translateY }], opacity }]}>
          <View style={styles.headerImageContainerCard}>
            <Image source={{ uri: destination.image }} style={styles.headerImageCard} />
            <TouchableOpacity style={styles.closeButton} onPress={handleRequestClose}>
              <Feather name="x" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.nameRow}>
              <Text style={[styles.name, { color: darkMode ? '#fff' : '#111827' }]} numberOfLines={1}>{destination.name}</Text>
              <TouchableOpacity style={styles.modalFavoriteButton} onPress={() => toggleFavorite(destination.id)}>
                <Feather name="heart" size={18} color={isFavorite(destination.id) ? '#ef4444' : (darkMode ? '#d1d5db' : '#111827')} />
              </TouchableOpacity>
            </View>

            <View style={styles.metaRow}>
              <Feather name="map-pin" size={16} color={darkMode ? '#9ca3af' : '#6b7280'} />
              <Text style={[styles.metaText, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>{destination.location} • {destination.country}</Text>
            </View>

            <View style={styles.ratingRow}>
              <Feather name="star" size={16} color="#f59e0b" />
              <Text style={[styles.ratingText, { color: darkMode ? '#fff' : '#111827' }]}>{destination.rating} • {destination.reviews?.toLocaleString()}</Text>
            </View>

            <Text style={[styles.longDescription, { color: darkMode ? '#d1d5db' : '#374151' }]}>{destination.longDescription || destination.description}</Text>

            <View style={styles.ctaRow}>
              <TouchableOpacity
                style={[
                  styles.ctaButton,
                  { backgroundColor: darkMode ? 'rgba(255,255,255,0.04)' : '#f3f4f6' },
                ]}
                onPress={handleShare}
              >
                  <Feather name="share-2" size={18} color={darkMode ? '#fff' : '#111827'} />
                  <Text style={[styles.ctaText, { color: darkMode ? '#fff' : '#111827' }]}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.ctaButton,
                    { backgroundColor: darkMode ? 'rgba(255,255,255,0.04)' : '#f3f4f6' },
                  ]}
                  onPress={handleOpenMaps}
                >
                  <Feather name="map" size={18} color={darkMode ? '#fff' : '#111827'} />
                  <Text style={[styles.ctaText, { color: darkMode ? '#fff' : '#111827' }]}>Open in Maps</Text>
                </TouchableOpacity>

                {/* favorites removed from modal CTAs */}
            </View>

            {destination.gallery && destination.gallery.length > 0 && (
              <View style={styles.gallerySection}>
                <Text style={[styles.galleryTitle, { color: darkMode ? '#fff' : '#111827' }]}>Gallery</Text>
                <FlatList
                  horizontal
                  data={destination.gallery}
                  keyExtractor={(item, idx) => `${destination.id}-gallery-${idx}`}
                  renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.galleryImage} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 10 },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, zIndex: 20 },
  card: {
    width: '100%',
    maxWidth: 900,
    maxHeight: '85%',
    borderRadius: 16,
    overflow: 'hidden',
    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
  },
  headerImageContainerCard: { height: 220, position: 'relative', backgroundColor: '#000' },
  headerImageCard: { width: '100%', height: '100%', resizeMode: 'cover' },
  closeButton: { position: 'absolute', right: 12, top: 12, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  metaText: { marginLeft: 8, fontSize: 14 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ratingText: { marginLeft: 8, fontSize: 14, fontWeight: '600' },
  longDescription: { fontSize: 16, lineHeight: 22, marginBottom: 16 },
  gallerySection: { marginTop: 8 },
  galleryTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  galleryImage: { width: 200, height: 120, borderRadius: 12, marginRight: 12 },
  ctaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, gap: 8 },
  ctaButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.04)' },
  ctaText: { marginLeft: 8, fontSize: 14, fontWeight: '600' },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  modalFavoriteButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
});
