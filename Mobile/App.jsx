import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import  CartProvider  from './src/context/CartContext';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
