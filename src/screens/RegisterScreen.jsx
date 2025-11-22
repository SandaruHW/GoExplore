import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Appearance,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function RegisterScreen({ onRegister, onSwitchToLogin } = {}) {
  const colorScheme = Appearance.getColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    return () => sub.remove();
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      name: !name || name.length < 2,
      email: !email || !email.includes('@'),
      password: !password || password.length < 6,
      confirmPassword: password !== confirmPassword,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      if (typeof onRegister === 'function') onRegister();
    }
  };

  const bg = darkMode ? '#0f172a' : '#e6f6ff';
  const cardBg = darkMode ? '#0b1220' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#0f172a';
  const subText = darkMode ? '#94a3b8' : '#64748b';

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <Feather name="compass" size={36} color="#fff" />
          </View>
        </View>

        <Text style={[styles.title, { color: textColor }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: subText }]}>Join us and start exploring the world</Text>

        <View style={[styles.inputRow, errors.name ? styles.inputError : styles.inputNormal]}>
          <Feather name="user" size={18} color="#94a3b8" />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Sandaru Sathsara"
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
          />
        </View>
        {errors.name && <Text style={styles.errorText}>Please enter your name</Text>}

        <View style={[styles.inputRow, errors.email ? styles.inputError : styles.inputNormal]}>
          <Feather name="mail" size={18} color="#94a3b8" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="sandaruhw.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>Please enter a valid email</Text>}

        <View style={[styles.inputRow, errors.password ? styles.inputError : styles.inputNormal]}>
          <Feather name="lock" size={18} color="#94a3b8" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
          />
        </View>
        {errors.password && <Text style={styles.errorText}>Password must be at least 6 characters</Text>}

        <View style={[styles.inputRow, errors.confirmPassword ? styles.inputError : styles.inputNormal]}>
          <Feather name="lock" size={18} color="#94a3b8" />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
          />
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>Passwords do not match</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.9}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={[styles.loginText, { color: subText }]}>Already have an account? </Text>
          <TouchableOpacity onPress={onSwitchToLogin}>
            <Text style={[styles.loginLink, { color: '#06b6d4' }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  inputNormal: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#f87171',
    backgroundColor: '#fff1f1',
  },
  errorText: {
    color: '#ef4444',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#06b6d4',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
