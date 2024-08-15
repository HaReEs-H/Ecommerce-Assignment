import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const getCartByUser = createAsyncThunk('cart/fetch/user', async (userId) => {
  const response = await axios.get('http://localhost:3005/cart?user=' + userId)
  return response.data
})

export { getCartByUser }
