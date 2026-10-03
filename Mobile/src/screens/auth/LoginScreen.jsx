import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../../context/AuthContext'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
  if (!email.trim() || !password) {
    Alert.alert('Error', 'Please enter email and password');
    return;
  }

  try {
    setLoading(true);

    const response = await login(
      email.trim(),
      password
    );

    console.log('Login response:', response);

    Alert.alert(
      'Login Successful',
      `Welcome, ${response.user.name}!`
    );
  } catch (error) {
    console.log(
      'Login error:',
      error.response?.data
    );

    Alert.alert(
      'Login Failed',
      error.response?.data?.message ||
        'Something went wrong'
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
            Step into your style
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome 👋</Text>

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
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerLink}>
                Register
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
    marginBottom: 40,
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

  loginButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#777',
    fontSize: 14,
  },

  registerLink: {
    color: '#111',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default LoginScreen;