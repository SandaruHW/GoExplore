import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from '../context/AppContext';

export default function UserDetailsScreen({ onBack }) {
  const { user, darkMode, updateUserProfile } = useAppContext();
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePickImage = async () => {
    try {
      // Request camera roll permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need permission to access your photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setIsUpdating(true);
        // In a real app, you would upload this to a server and get back a URL
        // For now, we'll use the local URI
        const imageUri = result.assets[0].uri;
        await updateUserProfile({ avatar: imageUri });
        Alert.alert('Success', 'Profile picture updated!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangeProfilePic = async () => {
    await handlePickImage();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#f9fafb' }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient colors={['#0ea5e9', '#14b8a6']} style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Account</Text>
            <View style={styles.placeholder} />
          </View>
        </LinearGradient>

        {/* User Details Card */}
        <View style={[styles.detailsCard, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {isUpdating && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#0ea5e9" />
              </View>
            )}
            <Image 
              source={{ uri: user?.avatar || 'https://www.shutterstock.com/image-vector/default-avatar-social-media-display-600nw-2632690107.jpg' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity 
              style={styles.editAvatarButton}
              onPress={handleChangeProfilePic}
              disabled={isUpdating}
            >
              <Feather name="edit-2" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* User Information */}
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Feather name="user" size={20} color="#0ea5e9" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                  Full Name
                </Text>
                <Text style={[styles.infoValue, { color: darkMode ? '#fff' : '#111827' }]}>
                  {user?.firstName} {user?.lastName}
                </Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <Feather name="mail" size={20} color="#0ea5e9" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                  Email Address
                </Text>
                <Text style={[styles.infoValue, { color: darkMode ? '#fff' : '#111827' }]}>
                  {user?.email}
                </Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <Feather name="calendar" size={20} color="#0ea5e9" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                  Member Since
                </Text>
                <Text style={[styles.infoValue, { color: darkMode ? '#fff' : '#111827' }]}>
                  January 2024
                </Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <Feather name="map-pin" size={20} color="#0ea5e9" style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                  Location
                </Text>
                <Text style={[styles.infoValue, { color: darkMode ? '#fff' : '#111827' }]}>
                  Colombo, Sri Lanka
                </Text>
              </View>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  detailsCard: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#0ea5e9',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '25%',
    backgroundColor: '#0ea5e9',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIcon: {
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  editButton: {
    backgroundColor: '#0ea5e9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});