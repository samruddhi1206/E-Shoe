import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../services/api';

export const AuthContext = createContext();

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved login
  useEffect(() => {
    loadAuth();
  }, []);

  const loadAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_KEY);
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.log('Load auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      // Call backend login API
      const response = await API.post('/auth/login', {
        email,
        password,
      });

      console.log('Backend login response:', response.data);

      const userData = response.data.user;
      const userToken = response.data.token;

      // Save user
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify(userData),
      );

      // Save token
      await AsyncStorage.setItem(
        TOKEN_KEY,
        userToken,
      );

      // Update context
      setUser(userData);
      setToken(userToken);

      // Return response data to LoginScreen
      return response.data;

    } catch (error) {
      console.log(
        'Login API error:',
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);

      setUser(null);
      setToken(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};