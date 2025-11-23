import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useAppContext } from './src/context/AppContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import MainLayout from './src/components/MainLayout';

// Disable native screens to avoid RNSScreen native prop casting on some Android setups
enableScreens(false);

function AppContent() {
  const { isAuthenticated, isLoading, logout } = useAppContext();
  const [currentScreen, setCurrentScreen] = useState('login');
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);

  // Initialize auth state on app startup
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('login');
      }
    }
  }, [isAuthenticated, isLoading]);

  const handleLogin = () => {
    setCurrentScreen('home');
  };

  const handleRegister = () => {
    setCurrentScreen('home');
  };

  const handleLogout = async () => {
    await logout();
    setCurrentScreen('login');
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isAuthenticated ? (
        <>
          {currentScreen === 'login' ? (
            <LoginScreen
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentScreen('register')}
            />
          ) : (
            <RegisterScreen
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentScreen('login')}
            />
          )}
        </>
      ) : (
        <>
          {showUserDetails ? (
            <UserDetailsScreen onBack={() => setShowUserDetails(false)} />
          ) : showHelpSupport ? (
            <HelpSupportScreen onBack={() => setShowHelpSupport(false)} />
          ) : (
            // Render the real app layout. Native screens have been disabled above
            // to avoid a casting issue on some Android devices.
            <MainLayout
              onLogout={handleLogout}
              onShowUserDetails={() => setShowUserDetails(true)}
              onShowHelpSupport={() => setShowHelpSupport(true)}
            />
          )}
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
