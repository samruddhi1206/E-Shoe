import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const OrderSuccessScreen = ({navigation, route}) => {
  const {orderId} = route.params || {};

  return (
    <View style={styles.container}>

      <View style={styles.iconCircle}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.title}>
        Order Placed!
      </Text>

      <Text style={styles.subtitle}>
        Your order has been placed successfully.
      </Text>

      {orderId && (
        <Text style={styles.orderId}>
          Order #{orderId.slice(-8)}
        </Text>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Thank you for shopping with E-Shoe 👟
        </Text>

        <Text style={styles.cardText}>
          You can track your order from the My Orders section.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Orders')}>
        <Text style={styles.primaryText}>
          View My Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Home',
          })
        }>
        <Text style={styles.secondaryText}>
          Continue Shopping
        </Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8F8EE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  check: {
    fontSize: 50,
    fontWeight: '900',
    color: '#168544',
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111',
    marginTop: 25,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },

  orderId: {
    fontSize: 13,
    color: '#555',
    fontWeight: '700',
    marginTop: 12,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
  },

  cardText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 7,
  },

  primaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#111',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  primaryText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },

  secondaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#FFF',
  },

  secondaryText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default OrderSuccessScreen;