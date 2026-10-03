import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import API from '../services/api';

const categories = ['All', 'Men', 'Women', 'Kids'];

const HomeScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const [popularProducts, setPopularProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch popular products when screen loads
  useEffect(() => {
    fetchPopularProducts();
  }, []);

  // Get products from MongoDB
  const fetchPopularProducts = async () => {
    try {
      setLoadingProducts(true);

      const response = await API.get('/products');

      const products = response.data.products || [];

      // Sort by highest rating and take only 6
      const sortedProducts = [...products]
        .sort((a, b) => {
          return (b.rating || 0) - (a.rating || 0);
        })
        .slice(0, 4);

      setPopularProducts(sortedProducts);
    } catch (error) {
      console.log(
        'Popular products error:',
        error.response?.data || error.message,
      );

      setPopularProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>
                Hello 👋
              </Text>

              <Text style={styles.userName}>
                {user?.name || 'Shoe Lover'}
              </Text>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>
                ♡
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>
              Find Your
            </Text>

            <Text style={styles.mainTitleBold}>
              Perfect Pair.
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>
              ⌕
            </Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search shoes..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Categories */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Categories
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}>
            
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setSelectedCategory(category)
                }>
                
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.categoryTextActive,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Hero Banner */}
          <View style={styles.heroCard}>
            <View style={styles.heroContent}>
              <Text style={styles.heroSmall}>
                NEW COLLECTION
              </Text>

              <Text style={styles.heroTitle}>
                STEP INTO
              </Text>

              <Text style={styles.heroTitle}>
                YOUR STYLE
              </Text>

              <Text style={styles.heroDescription}>
                Discover shoes designed for every step.
              </Text>

              <TouchableOpacity
                style={styles.heroButton}
                onPress={() =>
                  navigation.navigate('MainTabs', {
                    screen: 'Products',
                  })
                }>
                
                <Text style={styles.heroButtonText}>
                  SHOP NOW
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heroShoe}>
              👟
            </Text>
          </View>

          {/* Popular Shoes Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Popular Shoes
            </Text>

            <TouchableOpacity>
              <Text style={styles.seeAll}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {/* Loading */}
          {loadingProducts && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>
                Loading popular shoes...
              </Text>
            </View>
          )}

          {/* Products */}
          {!loadingProducts && (
            <View style={styles.productGrid}>
              {popularProducts.map(product => (
                <TouchableOpacity
                  key={product._id}
                  style={styles.productCard}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      productId: product._id,
                      product: product,
                    })
                  }>

                  {/* Favorite */}
                  <View style={styles.favoriteButton}>
                    <Text style={styles.favoriteIcon}>
                      ♡
                    </Text>
                  </View>

                  {/* Product Image */}
                  <View style={styles.productImage}>
                    {product.images &&
                    product.images.length > 0 ? (
                      <Image
                        source={{
                          uri: product.images[0],
                        }}
                        style={styles.productImageActual}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text style={styles.shoeEmoji}>
                        👟
                      </Text>
                    )}
                  </View>

                  {/* Product Name */}
                  <Text
                    style={styles.productName}
                    numberOfLines={1}>
                    {product.name}
                  </Text>

                  {/* Brand / Category */}
                  <Text
                    style={styles.productCategory}
                    numberOfLines={1}>
                    {product.brand} • {product.category}
                  </Text>

                  {/* Rating */}
                  <View style={styles.ratingRow}>
                    <Text style={styles.star}>
                      ★
                    </Text>

                    <Text style={styles.rating}>
                      {product.rating || 0}
                    </Text>
                  </View>

                  {/* Price */}
                  <Text style={styles.price}>
                    ₹{product.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* No Products */}
          {!loadingProducts &&
            popularProducts.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No popular shoes found
                </Text>
              </View>
            )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100,
  },

  /* Header */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 13,
    color: '#888',
  },

  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginTop: 3,
  },

  notificationButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationIcon: {
    fontSize: 25,
    color: '#111',
  },

  /* Title */

  titleSection: {
    marginTop: 30,
  },

  mainTitle: {
    fontSize: 30,
    fontWeight: '400',
    color: '#111',
  },

  mainTitleBold: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
  },

  /* Search */

  searchContainer: {
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#EEE',
  },

  searchIcon: {
    fontSize: 25,
    color: '#777',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111',
  },

  /* Section */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#111',
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },

  /* Categories */

  categoryList: {
    gap: 10,
  },

  categoryButton: {
    paddingHorizontal: 22,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  categoryButtonActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },

  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },

  categoryTextActive: {
    color: '#FFF',
  },

  /* Hero */

  heroCard: {
    backgroundColor: '#111',
    borderRadius: 22,
    minHeight: 230,
    marginTop: 28,
    padding: 25,
    overflow: 'hidden',
    flexDirection: 'row',
  },

  heroContent: {
    flex: 1,
    zIndex: 2,
  },

  heroSmall: {
    fontSize: 10,
    color: '#AAA',
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 12,
  },

  heroTitle: {
    fontSize: 27,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
  },

  heroDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 10,
    lineHeight: 18,
  },

  heroButton: {
    backgroundColor: '#FFF',
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginTop: 18,
  },

  heroButtonText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#111',
  },

  heroShoe: {
    fontSize: 90,
    position: 'absolute',
    right: 5,
    bottom: 25,
    transform: [{rotate: '-15deg'}],
  },

  /* Products */

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
  },

  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIcon: {
    fontSize: 20,
    color: '#555',
  },

  productImage: {
    height: 130,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  productImageActual: {
    width: '100%',
    height: '100%',
  },

  shoeEmoji: {
    fontSize: 65,
    transform: [{rotate: '-15deg'}],
  },

  productName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginTop: 12,
  },

  productCategory: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },

  /* Rating */

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  star: {
    fontSize: 14,
    color: '#F5A623',
    marginRight: 4,
  },

  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
  },

  /* Price */

  price: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111',
    marginTop: 7,
  },

  /* Loading */

  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  loadingText: {
    fontSize: 13,
    color: '#888',
  },

  /* Empty */

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },

  emptyText: {
    color: '#888',
    fontSize: 14,
  },
});

export default HomeScreen;