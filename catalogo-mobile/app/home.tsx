import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../src/store/store';
import { logout } from '../src/store/userSlice';
import { fetchMaleProducts, fetchFemaleProducts, Product } from '../src/store/productsSlice';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('male');
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { maleProducts, femaleProducts, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { email } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchMaleProducts() as any);
    dispatch(fetchFemaleProducts() as any);
  }, [dispatch]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: () => {
            dispatch(logout());
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
          {item.discountPercentage > 0 && (
            <Text style={styles.discount}>-{item.discountPercentage.toFixed(0)}%</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const currentProducts = activeTab === 'male' ? maleProducts : femaleProducts;

  if (loading && currentProducts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá!</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'male' && styles.activeTab]}
          onPress={() => setActiveTab('male')}
        >
          <Text style={[styles.tabText, activeTab === 'male' && styles.activeTabText]}>
            Produtos Masculinos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'female' && styles.activeTab]}
          onPress={() => setActiveTab('female')}
        >
          <Text style={[styles.tabText, activeTab === 'female' && styles.activeTabText]}>
            Produtos Femininos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erro ao carregar produtos: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={currentProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  header: {
    backgroundColor: '#4285F4',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  emailText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4285F4',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
  productList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    minHeight: 36,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  discount: {
    fontSize: 12,
    color: '#FF5252',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF5252',
    textAlign: 'center',
  },
});