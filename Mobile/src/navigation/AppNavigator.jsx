import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{headerShown: true, title: '', headerBackTitle:''}} />

      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{headerShown: true, title: '', headerBackTitle:''}}/>
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
