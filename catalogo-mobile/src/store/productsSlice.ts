import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsState {
  maleProducts: Product[];
  femaleProducts: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  maleProducts: [],
  femaleProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
};

const maleCategories = ['mens-shirts', 'mens-shoes', 'mens-watches'];
const femaleCategories = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

export const fetchMaleProducts = createAsyncThunk(
  'products/fetchMaleProducts',
  async () => {
    const promises = maleCategories.map(category => 
      api.get(`/products/category/${category}`)
    );
    const responses = await Promise.all(promises);
    return responses.flatMap(response => response.data.products);
  }
);

export const fetchFemaleProducts = createAsyncThunk(
  'products/fetchFemaleProducts',
  async () => {
    const promises = femaleCategories.map(category => 
      api.get(`/products/category/${category}`)
    );
    const responses = await Promise.all(promises);
    return responses.flatMap(response => response.data.products);
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Male Products
      .addCase(fetchMaleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.maleProducts = action.payload;
      })
      .addCase(fetchMaleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar produtos masculinos';
      })
      // Female Products
      .addCase(fetchFemaleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFemaleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.femaleProducts = action.payload;
      })
      .addCase(fetchFemaleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar produtos femininos';
      })
      // Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao carregar produto';
      });
  },
});

export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;