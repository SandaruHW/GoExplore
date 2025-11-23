import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../AppContext';

export default function ProfileScreen() {
  const { darkMode, user } = useAppContext();
  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#f9fafb' }]}>
      <Text style={[styles.text, { color: darkMode ? '#fff' : '#111827' }]}>Profile Screen</Text>
      <Text style={[styles.subtext, { color: darkMode ? '#ccc' : '#666' }]}>Welcome, {user.firstName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
  },
});