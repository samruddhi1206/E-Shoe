import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const OrderDetailsScreen = ({route}) => {
  const {order} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* Header */}
        <Text style={styles.title}>
          Order Details
        </Text>

        <Text style={styles.orderId}>
          Order #{order._id?.slice(-8)}
        </Text>

        {/* Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Text style={styles.check}>✓</Text>
          </View>

          <View>
            <Text style={styles.statusTitle}>
              {order.orderStatus}
            </Text>

            <Text style={styles.statusSubtitle}>
              Your order has been placed successfully
            </Text>
          </View>
        </View>

        {/* Products */}
        <Text style={styles.sectionTitle}>
          Items
        </Text>

        {order.items?.map((item, index) => (
          <View
            key={`${item.productId}-${index}`}
            style={styles.productCard}>

            <View style={styles.productImage}>
              <Text style={styles.shoe}>
                👟
              </Text>
            </View>

            <View style={styles.productDetails}>
              <Text style={styles.brand}>
                {item.brand}
              </Text>

              <Text
                style={styles.productName}
                numberOfLines={2}>
                {item.name}
              </Text>

              <Text style={styles.variant}>
                Size: {item.size} • {item.color}
              </Text>

              <Text style={styles.quantity}>
                Quantity: {item.quantity}
              </Text>
            </View>

            <Text style={styles.price}>
              ₹{item.price * item.quantity}
            </Text>
          </View>
        ))}

        {/* Delivery Address */}
        <Text style={styles.sectionTitle}>
          Delivery Address
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.address}>
            {order.address?.address}
          </Text>

          <Text style={styles.address}>
            {order.address?.city}
          </Text>

          <Text style={styles.address}>
            {order.address?.state}
          </Text>

          <Text style={styles.address}>
            {order.address?.pincode}
          </Text>
        </View>

        {/* Payment */}
        <Text style={styles.sectionTitle}>
          Payment Method
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentIcon}>
              💵
            </Text>

            <View>
              <Text style={styles.paymentTitle}>
                {order.paymentMethod}
              </Text>

              <Text style={styles.paymentSubtitle}>
                Payment on delivery
              </Text>
            </View>
          </View>
        </View>

        {/* Price Summary */}
        <Text style={styles.sectionTitle}>
          Price Details
        </Text>

        <View style={styles.summaryCard}>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>
              Items
            </Text>

            <Text style={styles.value}>
              {order.items?.reduce(
                (total, item) => total + item.quantity,
                0,
              )}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>
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

            <Text style={styles.total}>
              ₹{order.totalAmount}
            </Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#111',
  },

  orderId: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },

  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E8F8EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  check: {
    fontSize: 24,
    fontWeight: '900',
    color: '#168544',
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#168544',
  },

  statusSubtitle: {
    fontSize: 11,
    color: '#888',
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
    marginTop: 25,
    marginBottom: 10,
  },

  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  productImage: {
    width: 75,
    height: 75,
    borderRadius: 13,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shoe: {
    fontSize: 38,
  },

  productDetails: {
    flex: 1,
    marginLeft: 12,
  },

  brand: {
    fontSize: 10,
    color: '#999',
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  productName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
    marginTop: 2,
  },

  variant: {
    fontSize: 10,
    color: '#777',
    marginTop: 4,
  },

  quantity: {
    fontSize: 10,
    color: '#999',
    marginTop: 3,
  },

  price: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111',
    marginLeft: 5,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  address: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentIcon: {
    fontSize: 25,
    marginRight: 12,
  },

  paymentTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },

  paymentSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },

  free: {
    fontSize: 13,
    fontWeight: '800',
    color: '#168544',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111',
  },

  total: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },
});

export default OrderDetailsScreen;