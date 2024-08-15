import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const addOrder = createAsyncThunk('order/create', async (order) => {
  const headers = {
    'content-type': 'application/json',
  }
  const response = await axios.post('http://localhost:3005/orders', order, {
    headers,
  })
  return response.data
})

export { addOrder }
