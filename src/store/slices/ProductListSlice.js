import { createSlice } from '@reduxjs/toolkit'
import {
  //fetchBrands,
  fetchCategories,
  fetchProducts,
  fetchProductsByFilter,
  fetchProductById,
} from '../thunks/products/fetchProducts'

const ProductListSlice = createSlice({
  name: 'productlist',
  initialState: {
    productsData: [],
    categories: [],
    isLoading: false,
    error: null,
    totalItems: 0,
    selectedProduct: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.productsData = action.payload
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    builder.addCase(fetchProductsByFilter.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProductsByFilter.fulfilled, (state, action) => {
      state.isLoading = false
      state.productsData = action.payload.data
      // state.totalItems = action.payload.totalItems
    })
    builder.addCase(fetchProductsByFilter.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // builder.addCase(fetchBrands.fulfilled, (state, action) => {
    //   state.brands = action.payload
    // })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      console.log(action.payload)
      state.selectedProduct = action.payload
    })
  },
})

export const ProductReducer = ProductListSlice.reducer
