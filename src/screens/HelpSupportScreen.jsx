import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

export default function HelpSupportScreen({ onBack }) {
  const { darkMode } = useAppContext();

  const helpItems = [
    {
      id: 'faq',
      iconName: 'help-circle',
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions',
      action: () => console.log('Open FAQ'),
    },
    {
      id: 'contact',
      iconName: 'mail',
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      action: () => Linking.openURL('mailto:support@goexplore.com'),
    },
    {
      id: 'chat',
      iconName: 'message-circle',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      action: () => console.log('Open live chat'),
    },
    {
      id: 'guides',
      iconName: 'book-open',
      title: 'User Guides',
      description: 'Learn how to use GoExplore features',
      action: () => console.log('Open user guides'),
    },
  ];

  const quickActions = [
    {
      id: 'report',
      iconName: 'flag',
      title: 'Report Issue',
      color: '#ef4444',
    },
    {
      id: 'feedback',
      iconName: 'star',
      title: 'Send Feedback',
      color: '#f59e0b',
    },
    {
      id: 'rate',
      iconName: 'thumbs-up',
      title: 'Rate App',
      color: '#10b981',
    },
  ];

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
            <Text style={styles.headerTitle}>Help & Support</Text>
            <View style={styles.placeholder} />
          </View>
        </LinearGradient>

        {/* Welcome Message */}
        <View style={[styles.welcomeCard, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
          <View style={styles.welcomeIcon}>
            <Feather name="headphones" size={32} color="#0ea5e9" />
          </View>
          <Text style={[styles.welcomeTitle, { color: darkMode ? '#fff' : '#111827' }]}>
            How can we help you?
          </Text>
          <Text style={[styles.welcomeText, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
            We're here to help you make the most of your GoExplore experience.
          </Text>
        </View>

        {/* Help Options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#111827' }]}>
            Get Help
          </Text>
          {helpItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.action}
              style={[
                styles.helpItem,
                { backgroundColor: darkMode ? '#1f2937' : '#fff' },
                index < helpItems.length - 1 && styles.itemBorder,
                { borderBottomColor: darkMode ? '#374151' : '#e5e7eb' },
              ]}
            >
              <View style={styles.helpLeft}>
                <View style={[styles.iconContainer, { backgroundColor: darkMode ? 'rgba(14,165,233,0.2)' : '#fef3c7' }]}>
                  <Feather name={item.iconName} size={20} color="#0ea5e9" />
                </View>
                <View style={styles.helpContent}>
                  <Text style={[styles.helpTitle, { color: darkMode ? '#fff' : '#111827' }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.helpDescription, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#111827' }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => console.log(`Action: ${action.title}`)}
                style={[styles.quickAction, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <Feather name={action.iconName} size={24} color={action.color} />
                </View>
                <Text style={[styles.quickActionTitle, { color: darkMode ? '#fff' : '#111827' }]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View style={[styles.contactCard, { backgroundColor: darkMode ? '#1f2937' : '#fff' }]}>
          <Text style={[styles.contactTitle, { color: darkMode ? '#fff' : '#111827' }]}>
            Still need help?
          </Text>
          <Text style={[styles.contactText, { color: darkMode ? '#9ca3af' : '#6b7280' }]}>
            Our support team is available 24/7 to assist you.
          </Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:support@goexplore.com')}
              style={[styles.contactButton, styles.primaryButton]}
            >
              <Feather name="mail" size={16} color="#fff" />
              <Text style={styles.primaryButtonText}>Email Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:+1234567890')}
              style={[styles.contactButton, styles.secondaryButton, { borderColor: darkMode ? '#374151' : '#e5e7eb' }]}
            >
              <Feather name="phone" size={16} color={darkMode ? '#fff' : '#111827'} />
              <Text style={[styles.secondaryButtonText, { color: darkMode ? '#fff' : '#111827' }]}>
                Call Us
              </Text>
            </TouchableOpacity>
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
  welcomeCard: {
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeIcon: {
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemBorder: {
    borderBottomWidth: 1,
  },
  helpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 14,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  contactCard: {
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
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});