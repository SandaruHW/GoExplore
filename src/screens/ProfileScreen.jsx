import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';

export default function ProfileScreen({ onLogout }) {
  const { user, darkMode, toggleDarkMode, favorites } = useAppContext();

  const settingsItems = [
    {
      id: 'account',
      iconName: 'user',
      label: 'My Account',
      action: () => console.log('My Account'),
    },
    {
      id: 'help',
      iconName: 'help-circle',
      label: 'Help & Support',
      action: () => console.log('Help & Support'),
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#f9fafb' }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient colors={['#0ea5e9', '#14b8a6']} style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>

          {/* User Info Card */}
          <View style={styles.userCard}>
            <View style={styles.userInfo}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>
                  {user.firstName} {user.lastName}
                </Text>
                <View style={styles.emailContainer}>
                  <Feather name="mail" size={14} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.email}>{user.email}</Text>
                </View>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Explored</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{favorites.length}</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Settings */}
        <View style={styles.settings}>
          {/* Dark Mode Toggle */}
          <View style={[styles.settingCard, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
            <TouchableOpacity onPress={toggleDarkMode} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: darkMode ? 'rgba(14,165,233,0.2)' : '#fef3c7' }]}>
                  {darkMode ? (
                    <Feather name="moon" size={20} color="#0ea5e9" />
                  ) : (
                    <Feather name="sun" size={20} color="#f59e0b" />
                  )}
                </View>
                <View>
                  <Text style={[styles.settingTitle, { color: darkMode ? '#fff' : '#111827' }]}>
                    Dark Mode
                  </Text>
                  <Text style={[styles.settingSubtitle, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                    {darkMode ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: '#d1d5db', true: '#0ea5e9' }}
                thumbColor="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Settings Items */}
          <View style={[styles.settingCard, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
            {settingsItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={item.action}
                  style={[
                    styles.settingItem,
                    index < settingsItems.length - 1 && styles.settingItemBorder,
                    { borderBottomColor: darkMode ? '#374151' : '#e5e7eb' },
                  ]}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      <Feather name={item.iconName} size={20} color="#0ea5e9" />
                    </View>
                    <Text style={[styles.settingTitle, { color: darkMode ? '#fff' : '#111827' }]}>
                      {item.label}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Logout Button */}
          <TouchableOpacity onPress={onLogout} style={[styles.settingCard, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(239,68,68,0.1)' }]}>
                  <Feather name="log-out" size={20} color="#ef4444" />
                </View>
                <Text style={styles.logoutText}>Log Out</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#ef4444" />
            </View>
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
    paddingTop: 56,
    paddingBottom: 80,
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
  userCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
  },
  userDetails: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  settings: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  settingCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(14,165,233,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ef4444',
  },
});
