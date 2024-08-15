import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const getUser = createAsyncThunk('users/fetch', async (loginInfo) => {
  const email = loginInfo.email
  const password = loginInfo.password
  const response = await axios.get('http://localhost:3005/users?email=' + email)
  if (response.data.length === 0) {
    throw new Error('User not found')
  }
  const user = response.data[0]
  if (user.password !== password) {
    throw new Error('Incorrect credentails')
  }
  return user
})

export { getUser }
