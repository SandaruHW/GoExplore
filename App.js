import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/AppContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainLayout from './src/components/MainLayout';

// Disable native screens to avoid RNSScreen native prop casting on some Android setups
enableScreens(false);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const handleLogin = () => {
    console.log('Logged in');
    setCurrentScreen('home');
  };

  const handleRegister = () => {
    console.log('Registered');
    setCurrentScreen('home');
  };

  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={styles.container}>
            {currentScreen === 'login' ? (
              <LoginScreen
                onLogin={handleLogin}
                onSwitchToRegister={() => setCurrentScreen('register')}
              />
            ) : currentScreen === 'register' ? (
              <RegisterScreen
                onRegister={handleRegister}
                onSwitchToLogin={() => setCurrentScreen('login')}
              />
            ) : (
              // Render the real app layout. Native screens have been disabled above
              // to avoid a casting issue on some Android devices.
              <MainLayout />
            )}
            <StatusBar style="auto" />
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
