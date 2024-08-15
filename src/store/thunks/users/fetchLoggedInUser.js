import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchLoggedInUser = createAsyncThunk(
  'loggeduser/fetch',
  async (userId) => {
    const response = await axios.get('http://localhost:3005/users/' + userId)
    return response.data
  }
)

export { fetchLoggedInUser }
