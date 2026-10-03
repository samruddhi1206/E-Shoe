import React, { useEffect, useState } from 'react';
import API from '../services/api';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const genders = ['All', 'Men', 'Women', 'Kids'];

const categories = ['All', 'Sneakers', 'Running', 'Casual', 'Sports'];

const ExploreScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await API.get('/products');

      setProducts(response.data.products);
    } catch (error) {
      console.log(
        'Product fetch error:',
        error.response?.data || error.message,
      );

      setError('Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const genderMatch =
      selectedGender === 'All' || product.gender === selectedGender;

    const categoryMatch =
      selectedCategory === 'All' || product.category === selectedCategory;

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return genderMatch && categoryMatch && searchMatch;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading shoes...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <Text style={styles.title}>Explore</Text>

        <Text style={styles.subtitle}>Find your perfect pair</Text>

        {/* Search */}

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search shoes..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Gender */}

        <Text style={styles.filterTitle}>Gender</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {genders.map(gender => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.filterButton,
                selectedGender === gender && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedGender(gender)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedGender === gender && styles.filterTextActive,
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Category */}

        <Text style={styles.filterTitle}>Category</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category && styles.filterTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}

        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Shoes</Text>

          <Text style={styles.resultCount}>
            {filteredProducts.length} items
          </Text>
        </View>

        {/* Product Grid */}

        <View style={styles.productGrid}>
          {filteredProducts.map(product => (
            <TouchableOpacity
              key={product._id}
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  product,
                })
              }
            >
              <View style={styles.imageContainer}>
                <Text style={styles.shoeEmoji}>👟</Text>

                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={styles.favorite}>♡</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.productName}>{product.name}</Text>

              <Text style={styles.productInfo}>
                {product.gender} • {product.category}
              </Text>

              <Text style={styles.price}>{product.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* No results */}

        {filteredProducts.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No shoes found</Text>

            <Text style={styles.emptySubText}>
              Try another gender or category
            </Text>
          </View>
        )}
      </ScrollView>
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
    paddingBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },

  searchBox: {
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 13,
    marginTop: 22,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },

  searchIcon: {
    fontSize: 24,
    color: '#777',
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#111',
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginTop: 22,
    marginBottom: 10,
  },

  filterButton: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  filterButtonActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },

  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
  },

  filterTextActive: {
    color: '#FFF',
  },

  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 15,
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },

  resultCount: {
    fontSize: 12,
    color: '#888',
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 15,
  },

  imageContainer: {
    height: 145,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shoeEmoji: {
    fontSize: 70,
    transform: [{ rotate: '-15deg' }],
  },

  favoriteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favorite: {
    fontSize: 20,
    color: '#111',
  },

  productName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginTop: 12,
  },

  productInfo: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },

  price: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111',
    marginTop: 8,
  },

  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
  },

  emptySubText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },

  loadingText: {
    fontSize: 15,
    color: '#777',
  },
  errorText: {
    color: '#D00',
    fontSize: 14,
  },
});

export default ExploreScreen;
