import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import API from '../services/api'
import { CartContext } from '../context/CartContext';

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, totalItems, totalPrice, clearCart } =
    useContext(CartContext);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

 const handlePlaceOrder = async () => {
  if (!fullName.trim()) {
    Alert.alert('Required', 'Please enter your full name');
    return;
  }

  if (!phone.trim()) {
    Alert.alert('Required', 'Please enter your phone number');
    return;
  }

  if (!address.trim()) {
    Alert.alert('Required', 'Please enter your address');
    return;
  }

  if (!city.trim()) {
    Alert.alert('Required', 'Please enter your city');
    return;
  }

  if (!state.trim()) {
    Alert.alert('Required', 'Please enter your state');
    return;
  }

  if (!pincode.trim()) {
    Alert.alert('Required', 'Please enter your pincode');
    return;
  }

 const orderData = {
  items: cartItems.map(item => ({
    productId: item.productId,
    name: item.name,
    brand: item.brand,
    price: item.price,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
  })),

  address: {
    address: address.trim(),
    city: city.trim(),
    state: state.trim(),
    pincode: pincode.trim(),
  },

  totalAmount: totalPrice,

  paymentMethod: 'Cash on Delivery',
};

  try {
    console.log('ORDER DATA:', orderData);

    // Send order to backend
    const response = await API.post('/orders', orderData);

    console.log('ORDER RESPONSE:', response.data);

    // Get order ID
    const orderId = response.data?.order?._id;

    if (!orderId) {
      console.log('Order ID not found:', response.data);

      Alert.alert(
        'Error',
        'Order was created but order ID was not received.',
      );

      return;
    }

    // Clear cart only after successful order
    clearCart();

    // Go to success screen
    navigation.replace('OrderSuccess', {
      orderId: orderId,
    });

  } catch (error) {
    console.log(
      'PLACE ORDER ERROR:',
      error.response?.data || error.message,
    );

    Alert.alert(
      'Order Failed',
      error.response?.data?.message ||
        'Unable to place your order. Please try again.',
    );
  }
};

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Checkout</Text>

            <Text style={styles.subtitle}>Delivery information</Text>
          </View>
        </View>

        {/* Delivery Address */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>

          {/* Full Name */}

          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Phone */}

          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />

          {/* Address */}

          <Text style={styles.label}>Address</Text>

          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="House no, street, area"
            placeholderTextColor="#999"
            value={address}
            onChangeText={setAddress}
            multiline
          />

          {/* City */}

          <Text style={styles.label}>City</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
          />

          {/* State */}

          <Text style={styles.label}>State</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter state"
            placeholderTextColor="#999"
            value={state}
            onChangeText={setState}
          />

          {/* Pincode */}

          <Text style={styles.label}>Pincode</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter pincode"
            placeholderTextColor="#999"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        {/* Order Summary */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Items</Text>

            <Text style={styles.rowValue}>{totalItems}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Subtotal</Text>

            <Text style={styles.rowValue}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery</Text>

            <Text style={styles.free}>FREE</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>

            <Text style={styles.totalPrice}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* Payment Method */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          <View style={styles.paymentCard}>
            <View style={styles.radio}>
              <View style={styles.radioInner} />
            </View>

            <View>
              <Text style={styles.paymentTitle}>Cash on Delivery</Text>

              <Text style={styles.paymentSubtitle}>
                Pay when your order arrives
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order */}

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total</Text>

          <Text style={styles.bottomPrice}>
            ₹{totalPrice.toLocaleString('en-IN')}
          </Text>
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  backText: {
    fontSize: 32,
    color: '#111',
    marginTop: -4,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
  },

  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },

  section: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 11,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#111',
    backgroundColor: '#FAFAFA',
  },

  addressInput: {
    height: 80,
    paddingTop: 13,
    textAlignVertical: 'top',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  rowLabel: {
    fontSize: 13,
    color: '#777',
  },

  rowValue: {
    fontSize: 13,
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
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
  },

  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 14,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111',
  },

  paymentTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },

  paymentSubtitle: {
    fontSize: 11,
    color: '#888',
    marginTop: 3,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bottomLabel: {
    fontSize: 11,
    color: '#888',
  },

  bottomPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },

  orderButton: {
    backgroundColor: '#111',
    borderRadius: 14,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },

  orderButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default CheckoutScreen;
