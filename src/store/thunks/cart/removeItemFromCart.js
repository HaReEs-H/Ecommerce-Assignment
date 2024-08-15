import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const removeItemFromCart = createAsyncThunk('item/remove', async (itemId) => {
  const response = await axios.delete('http://localhost:3005/cart/' + itemId)
  return response.data
})

export { removeItemFromCart }
