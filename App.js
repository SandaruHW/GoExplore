import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logged in');
  };

  const handleRegister = () => {
    // Handle register logic here
    console.log('Registered');
  };

  return (
    <View style={styles.container}>
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
