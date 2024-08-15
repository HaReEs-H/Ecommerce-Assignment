import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const updateUser = createAsyncThunk('users/update', async (update) => {
  const headers = {
    'content-type': 'application/json',
  }
  const response = await axios.patch(
    'http://localhost:3005/users/' + update.id,
    update,
    { headers }
  )
  return response.data
})

export { updateUser }
