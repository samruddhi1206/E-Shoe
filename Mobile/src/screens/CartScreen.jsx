import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {CartContext} from '../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = ({navigation}) => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  const renderCartItem = ({item}) => {
    return (
      <View style={styles.card}>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.shoeEmoji}>👟</Text>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.details}>

          <Text style={styles.brand}>
            {item.brand}
          </Text>

          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.variant}>
            Size: {item.size}  •  Color: {item.color}
          </Text>

          <Text style={styles.price}>
            ₹{item.price}
          </Text>

          {/* Quantity */}
          <View style={styles.bottomRow}>

            <View style={styles.quantityBox}>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decreaseQuantity(item.cartId)}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantity}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => increaseQuantity(item.cartId)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>

            </View>

            <TouchableOpacity
              onPress={() => removeFromCart(item.cartId)}
            >
              <Text style={styles.remove}>
                Remove
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  };

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>

        <Text style={styles.emptyIcon}>🛒</Text>

        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptyText}>
          Looks like you haven't added anything yet.
        </Text>

      </View>
    );
  }

  return (
   <SafeAreaView style={{flex:1}}>
     <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            My Cart
          </Text>

          <Text style={styles.itemCount}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.cartId}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      {/* Bottom Summary */}
      <View style={styles.summary}>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Subtotal
          </Text>

          <Text style={styles.summaryValue}>
            ₹{totalPrice}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Delivery
          </Text>

          <Text style={styles.free}>
            FREE
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ₹{totalPrice}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutText}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>

      </View>

    </View>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111',
  },

  itemCount: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },

  list: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
  },

  imageContainer: {
    width: 105,
    height: 105,
    borderRadius: 14,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 95,
    height: 95,
  },

  shoeEmoji: {
    fontSize: 50,
  },

  details: {
    flex: 1,
    marginLeft: 14,
  },

  brand: {
    fontSize: 11,
    color: '#999',
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  name: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginTop: 3,
  },

  variant: {
    fontSize: 11,
    color: '#777',
    marginTop: 5,
  },

  price: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111',
    marginTop: 6,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
  },

  quantityButton: {
    width: 30,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  quantity: {
    fontSize: 13,
    fontWeight: '800',
    minWidth: 20,
    textAlign: 'center',
    color: '#111',
  },

  remove: {
    fontSize: 11,
    color: '#D33',
    fontWeight: '700',
  },

  summary: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 13,
    color: '#777',
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },

  free: {
    fontSize: 13,
    fontWeight: '800',
    color: '#159447',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 5,
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111',
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },

  checkoutButton: {
    height: 52,
    backgroundColor: '#111',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  checkoutText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
  },

  emptyText: {
    fontSize: 13,
    color: '#888',
    marginTop: 7,
    textAlign: 'center',
  },
});

export default CartScreen;