import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const updateCart = createAsyncThunk('cart/update', async (update) => {
  const headers = {
    'content-type': 'application-json',
  }
  console.log(update)
  const response = await axios.patch(
    'http://localhost:3005/cart/' + update.id,
    update,
    { headers }
  )
  return response.data
})

export { updateCart }
