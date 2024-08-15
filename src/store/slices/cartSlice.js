import { createSlice } from '@reduxjs/toolkit'
import { addToCart } from '../thunks/cart/addToCart'
import { getCartByUser } from '../thunks/cart/getCartByUser'
import { updateCart } from '../thunks/cart/updateCart'
import { removeItemFromCart } from '../thunks/cart/removeItemFromCart'
import { removeItemsFromCart } from '../thunks/cart/removeItemsFromCart'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  extraReducers(builder) {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.items.push(action.payload)
    })
    builder.addCase(getCartByUser.fulfilled, (state, action) => {
      state.items = action.payload
    })
    builder.addCase(updateCart.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      state.items[index] = action.payload
    })
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload)
      state.items.splice(index, 1)
    })
    builder.addCase(removeItemsFromCart.fulfilled, (state, action) => {
      state.items = []
    })
  },
})

export const cartReducer = cartSlice.reducer
