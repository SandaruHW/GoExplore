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

export default function LoginScreenNative({ onLogin } = {}) {
  const colorScheme = Appearance.getColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    return () => sub.remove();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSubmit = () => {
    const newErrors = {
      email: !email || !email.includes('@'),
      password: !password || password.length < 6,
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      if (typeof onLogin === 'function') onLogin();
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

        <Text style={[styles.title, { color: textColor }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: subText }]}>Sign in to continue your journey</Text>

        <View style={[styles.inputRow, errors.email ? styles.inputError : styles.inputNormal]}>
          <Feather name="mail" size={18} color="#94a3b8" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="your.email@example.com"
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
            placeholder="Enter your password"
            secureTextEntry
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
          />
        </View>
        {errors.password && <Text style={styles.errorText}>Password must be at least 6 characters</Text>}

        <View style={styles.forgotRow}>
          <TouchableOpacity>
            <Text style={[styles.forgotText, { color: '#06b6d4' }]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.9}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={[styles.registerText, { color: subText }]}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={[styles.registerLink, { color: '#06b6d4' }]}>Register</Text>
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
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 14,
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
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
