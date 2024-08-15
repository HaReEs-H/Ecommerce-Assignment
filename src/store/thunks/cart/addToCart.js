import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const addToCart = createAsyncThunk('cart/add', async (item) => {
  const headers = {
    'content-type': 'application/json',
  }
  const response = await axios.post('http://localhost:3005/cart', item, {
    headers,
  })
  return response.data
})

export { addToCart }
