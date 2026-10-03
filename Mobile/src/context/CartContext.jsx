import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const CART_KEY = 'E_SHOE_CART';

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart when app starts
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    saveCart();
  }, [cartItems]);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem(CART_KEY);

      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.log('Load cart error:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(
        CART_KEY,
        JSON.stringify(cartItems),
      );
    } catch (error) {
      console.log('Save cart error:', error);
    }
  };

  // Add product to cart
  const addToCart = (product, size, color, quantity) => {
    setCartItems(prevItems => {

      const existingItem = prevItems.find(
        item =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color,
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      const newItem = {
        cartId: Date.now().toString(),

        productId: product._id,

        name: product.name,

        brand: product.brand,

        price: product.price,

        image:
          product.images?.length > 0
            ? product.images[0]
            : null,

        size,

        color,

        quantity,
      };

      return [...prevItems, newItem];
    });
  };

  // Remove item
  const removeFromCart = cartId => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.cartId !== cartId),
    );
  };

  // Increase quantity
  const increaseQuantity = cartId => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = cartId => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.cartId === cartId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;