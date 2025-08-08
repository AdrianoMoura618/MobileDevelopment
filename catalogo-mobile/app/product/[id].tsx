import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/store/store';
import { fetchProductById } from '../../src/store/productsSlice';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { currentProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)) as any);
    }
}, [id, dispatch]);

  const handleBackPress = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Carregando produto...</Text>
      </View>
    );
  }

  if (error || !currentProduct) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'Produto não encontrado'}
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const discountedPrice = currentProduct.price * (1 - currentProduct.discountPercentage / 100);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backIconButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Produto</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: currentProduct.thumbnail }} 
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{currentProduct.title}</Text>
          
          {currentProduct.brand && (
            <Text style={styles.brandText}>Marca: {currentProduct.brand}</Text>
          )}
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ⭐ {currentProduct.rating.toFixed(1)} ({currentProduct.stock} em estoque)
            </Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            {currentProduct.discountPercentage > 0 ? (
              <View style={styles.priceWithDiscount}>
                <Text style={styles.originalPrice}>
                  R$ {currentProduct.price.toFixed(2)}
                </Text>
                <View style={styles.discountRow}>
                  <Text style={styles.discountedPrice}>
                    R$ {discountedPrice.toFixed(2)}
                  </Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      -{currentProduct.discountPercentage.toFixed(0)}% OFF
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.regularPrice}>
                R$ {currentProduct.price.toFixed(2)}
              </Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{currentProduct.description}</Text>
          </View>

          {/* Category */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Categoria</Text>
            <Text style={styles.categoryText}>{currentProduct.category}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    fontSize: 16,
    color: '#FF5252',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#4285F4',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIconButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  productImage: {
    width: width - 40,
    height: 250,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  productInfo: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 30,
  },
  brandText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  priceSection: {
    marginBottom: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  priceWithDiscount: {
    alignItems: 'flex-start',
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 5,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  discountedPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  regularPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  discountBadge: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  categorySection: {
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  backButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});