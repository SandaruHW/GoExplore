import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppContext } from '../AppContext';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainLayout({ onLogout, onShowUserDetails }) {
  const { darkMode } = useAppContext();

  const ProfileWrapper = (props) => <ProfileScreen {...props} onLogout={onLogout} onShowUserDetails={onShowUserDetails} />;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: darkMode ? '#111827' : '#ffffff',
          borderTopColor: darkMode ? '#374151' : '#e5e7eb',
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: darkMode ? '#9ca3af' : '#6b7280',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
