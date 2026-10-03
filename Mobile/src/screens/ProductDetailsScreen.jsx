import React, { useState, useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
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
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Product Details</Text>

          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.favorite}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Product Image */}

        <View style={styles.imageContainer}>
          {product.images && product.images.length > 0 ? (
            <Image
              source={{ uri: product.images[0] }}
              style={styles.productImage}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.shoeEmoji}>👟</Text>
          )}
        </View>

        {/* Brand */}

        <Text style={styles.brand}>{product.brand}</Text>

        {/* Product Name */}

        <Text style={styles.productName}>{product.name}</Text>

        {/* Rating */}

        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>

          <Text style={styles.rating}>{product.rating}</Text>

          <Text style={styles.ratingText}>Rating</Text>
        </View>

        {/* Price */}

        <Text style={styles.price}>
          ₹{product.price.toLocaleString('en-IN')}
        </Text>

        {/* Description */}

        <Text style={styles.sectionTitle}>Description</Text>

        <Text style={styles.description}>{product.description}</Text>

        {/* Size */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select Size</Text>

          <Text style={styles.sizeGuide}>Size Guide</Text>
        </View>

        <View style={styles.optionsContainer}>
          {product.sizes?.map(size => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedOption,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedOptionText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Color */}

        <Text style={styles.sectionTitle}>Select Color</Text>

        <View style={styles.optionsContainer}>
          {product.colors?.map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                selectedColor === color && styles.selectedOption,
              ]}
              onPress={() => setSelectedColor(color)}
            >
              <Text
                style={[
                  styles.colorText,
                  selectedColor === color && styles.selectedOptionText,
                ]}
              >
                {color}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity */}

        <View style={styles.quantityRow}>
          <Text style={styles.sectionTitle}>Quantity</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
            >
              <Text style={styles.quantityIcon}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Text style={styles.quantityIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stock */}

        <Text style={styles.stock}>{product.stock} items available</Text>
      </ScrollView>

      {/* Add To Cart */}

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>

          <Text style={styles.totalPrice}>
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            if (!selectedSize) {
              alert('Please select a size');
              return;
            }

            if (!selectedColor) {
              alert('Please select a color');
              return;
            }

            addToCart(product, selectedSize, selectedColor, quantity);
            alert('Added to cart');
          }}
        >
          <Text style={styles.cartButtonText}>Add to Cart</Text>
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

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: '#111',
    marginTop: -4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },

  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favorite: {
    fontSize: 24,
    color: '#111',
  },

  imageContainer: {
    height: 300,
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  productImage: {
    width: '90%',
    height: '90%',
  },

  shoeEmoji: {
    fontSize: 110,
    transform: [{ rotate: '-15deg' }],
  },

  brand: {
    fontSize: 13,
    color: '#888',
    fontWeight: '700',
    marginTop: 20,
    textTransform: 'uppercase',
  },

  productName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
    marginTop: 5,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  star: {
    fontSize: 18,
    color: '#F5A623',
  },

  rating: {
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 5,
    color: '#111',
  },

  ratingText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },

  price: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111',
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
    marginTop: 22,
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#777',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sizeGuide: {
    fontSize: 12,
    color: '#777',
    marginTop: 20,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  sizeButton: {
    width: 50,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },

  sizeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
  },

  colorButton: {
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },

  colorText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
  },

  selectedOption: {
    backgroundColor: '#111',
    borderColor: '#111',
  },

  selectedOptionText: {
    color: '#FFF',
  },

  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  quantity: {
    fontSize: 16,
    fontWeight: '800',
    marginHorizontal: 15,
    color: '#111',
  },

  stock: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },

  bottomContainer: {
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

  totalLabel: {
    fontSize: 12,
    color: '#888',
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
    marginTop: 2,
  },

  cartButton: {
    backgroundColor: '#111',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 15,
  },

  cartButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default ProductDetailsScreen;
