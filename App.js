import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppProvider } from './src/AppContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

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
          <HomeScreen />
        )}
        <StatusBar style="auto" />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
