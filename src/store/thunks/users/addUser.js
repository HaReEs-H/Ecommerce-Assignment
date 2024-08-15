import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const addUser = createAsyncThunk('user/add', async (userData) => {
  // const user = {
  //   user: JSON.stringify(userData),
  // }
  const headers = {
    'content-type': 'application/json',
  }
  const response = await axios.post('http://localhost:3005/users', userData, {
    headers,
  })

  //TODO: On server it will only return some info of user(not password)
  return response.data
})

export { addUser }
