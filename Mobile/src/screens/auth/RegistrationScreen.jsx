import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import API from '../../services/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Error',
        'Password must be at least 6 characters'
      );
      return;
    }

    try {
      setLoading(true);

      const response = await API.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      console.log('Register response:', response.data);

      Alert.alert(
        'Registration Successful',
        'Your account has been created!',
        [
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.log('Register error:', error.response?.data);
      console.log('Error Message:', error.message);
      console.log('Response:', error.response);
      console.log('Request',error.request);

      Alert.alert(
        'Registration Failed',
        error.response?.data?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>E-SHOE</Text>

          <Text style={styles.subtitle}>
            Create your account
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirm Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Creating Account...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLink}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },

  logo: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#111',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#777',
  },

  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#111',
    marginBottom: 18,
  },

  registerButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  loginText: {
    color: '#777',
    fontSize: 14,
  },

  loginLink: {
    color: '#111',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default RegisterScreen;