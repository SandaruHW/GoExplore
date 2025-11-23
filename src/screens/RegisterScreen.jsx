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
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { registerValidationSchema, validatePasswordStrength } from '../utils/validationSchemas';

export default function RegisterScreen({ onRegister, onSwitchToLogin } = {}) {
  const colorScheme = Appearance.getColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const { register } = useAppContext();

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });
    return () => sub.remove();
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 'none', message: '' });

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
    setPasswordStrength(validatePasswordStrength(text));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Validate using Yup schema
      await registerValidationSchema.validate({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      // Attempt registration
      await register({ firstName, lastName, email, password });

      if (typeof onRegister === 'function') {
        onRegister();
      }
    } catch (error) {
      if (error.path) {
        // Yup validation error
        setErrors((prev) => ({
          ...prev,
          [error.path]: error.message,
        }));
      } else {
        // Auth service error
        Alert.alert('Registration Failed', error.message || 'An error occurred during registration');
      }
    } finally {
      setIsLoading(false);
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

        <View style={[styles.inputRow, errors.firstName ? styles.inputError : styles.inputNormal]}>
          <Feather name="user" size={18} color="#94a3b8" />
          <TextInput
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
            }}
            placeholder="First Name"
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
            editable={!isLoading}
          />
        </View>
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        <View style={[styles.inputRow, errors.lastName ? styles.inputError : styles.inputNormal]}>
          <Feather name="user" size={18} color="#94a3b8" />
          <TextInput
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
            }}
            placeholder="Last Name"
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
            editable={!isLoading}
          />
        </View>
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <View style={[styles.inputRow, errors.email ? styles.inputError : styles.inputNormal]}>
          <Feather name="mail" size={18} color="#94a3b8" />
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
            editable={!isLoading}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={[styles.inputRow, errors.password ? styles.inputError : styles.inputNormal]}>
          <Feather name="lock" size={18} color="#94a3b8" />
          <TextInput
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Create a password"
            secureTextEntry
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
            editable={!isLoading}
          />
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        {password && !errors.password && (
          <Text
            style={[
              styles.strengthText,
              passwordStrength.strength === 'strong'
                ? styles.strengthStrong
                : passwordStrength.strength === 'medium'
                  ? styles.strengthMedium
                  : styles.strengthWeak,
            ]}
          >
            {passwordStrength.message}
          </Text>
        )}

        <View style={[styles.inputRow, errors.confirmPassword ? styles.inputError : styles.inputNormal]}>
          <Feather name="lock" size={18} color="#94a3b8" />
          <TextInput
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            placeholder="Confirm your password"
            secureTextEntry
            style={[styles.input, { color: textColor }]}
            placeholderTextColor={darkMode ? '#475569' : '#9CA3AF'}
            editable={!isLoading}
          />
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.9}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
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
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  strengthWeak: {
    color: '#ef4444',
  },
  strengthMedium: {
    color: '#f59e0b',
  },
  strengthStrong: {
    color: '#10b981',
  },
  button: {
    backgroundColor: '#06b6d4',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
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
