import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchLoggedInUserOrders = createAsyncThunk(
  'userorders/fetch',
  async (userId) => {
    const response = await axios.get(
      'http://localhost:3005/orders/?loggedInUser.id=' + userId
    )
    return response.data
  }
)

export { fetchLoggedInUserOrders }
