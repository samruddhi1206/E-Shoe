import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';

import API from '../services/api';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await API.get('/orders/my-orders');

      setOrders(response.data.orders || []);
    } catch (error) {
      console.log('Orders fetch error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = orderId => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: async () => {
          try {
            await API.delete(`/orders/${orderId}`);

            Alert.alert(
              'Order Cancelled',
              'Your order has been cancelled successfully.',
            );

            // Remove cancelled order from current screen
            setOrders(prevOrders =>
              prevOrders.filter(order => order._id !== orderId),
            );
          } catch (error) {
            console.log('Cancel order error:', error.response?.data);

            Alert.alert(
              'Error',
              error.response?.data?.message || 'Failed to cancel order',
            );
          }
        },
      },
    ]);
  };
  const renderOrder = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('OrderDetails', {
            order: item,
          })
        }
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.orderLabel}>ORDER</Text>

            <Text style={styles.orderId}>#{item._id?.slice(-8)}</Text>
          </View>

          <View style={styles.statusBox}>
            <Text style={styles.status}>{item.orderStatus}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.itemCount}>
          {item.items?.length || 0}{' '}
          {item.items?.length === 1 ? 'item' : 'items'}
        </Text>

        {item.items?.slice(0, 2).map(product => (
          <View
            key={`${item._id}-${product.productId}`}
            style={styles.productRow}
          >
            <View style={styles.productIcon}>
              <Text style={styles.shoe}>👟</Text>
            </View>

            <View style={styles.productDetails}>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>

              <Text style={styles.productInfo}>
                {product.brand} • Size {product.size} • {product.color}
              </Text>

              <Text style={styles.quantity}>Qty: {product.quantity}</Text>
            </View>

            <Text style={styles.productPrice}>₹{product.price}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.totalLabel}>Total Amount</Text>

            <Text style={styles.total}>₹{item.totalAmount}</Text>
          </View>

          <Text style={styles.viewDetails}>View Details →</Text>
        </View>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelOrder(item._id)}
        >
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading your orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📦</Text>

        <Text style={styles.emptyTitle}>No Orders Yet</Text>

        <Text style={styles.emptyText}>
          Your placed orders will appear here.
        </Text>

        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>

        <Text style={styles.subtitle}>
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item._id}
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111',
  },

  subtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },

  list: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: '700',
  },

  orderId: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
    marginTop: 3,
  },

  statusBox: {
    backgroundColor: '#EAF8EF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  status: {
    color: '#168544',
    fontSize: 11,
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 13,
  },

  itemCount: {
    fontSize: 12,
    color: '#777',
    fontWeight: '700',
    marginBottom: 10,
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  productIcon: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shoe: {
    fontSize: 28,
  },

  productDetails: {
    flex: 1,
    marginLeft: 12,
  },

  productName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },

  productInfo: {
    fontSize: 10,
    color: '#888',
    marginTop: 3,
  },

  quantity: {
    fontSize: 10,
    color: '#999',
    marginTop: 3,
  },

  productPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 10,
    color: '#999',
  },

  total: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
    marginTop: 2,
  },

  viewDetails: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },

  loading: {
    fontSize: 14,
    color: '#777',
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: '#111',
  },

  emptyText: {
    fontSize: 13,
    color: '#888',
    marginTop: 7,
    textAlign: 'center',
  },

  shopButton: {
    backgroundColor: '#111',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 22,
  },

  shopButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
  },
  cancelButton: {
    backgroundColor: '#FFECEC',
    borderWidth: 1,
    borderColor: '#FF4D4D',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 15,
  },

  cancelButtonText: {
    color: '#D60000',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default OrdersScreen;
