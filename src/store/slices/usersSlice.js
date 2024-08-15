import { createSlice } from '@reduxjs/toolkit'
import { addUser } from '../thunks/users/addUser'
import { getUser } from '../thunks/users/getUser'
import { updateUser } from '../thunks/users/updateUser'
import { signOutUser } from '../thunks/users/signOutUser'
import { fetchLoggedInUser } from '../thunks/users/fetchLoggedInUser'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loggedInUser: null,
    error: null,
    userInfo: null,
  },
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload
    })
    builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
      //This info can be different or more than loggedin user info
      state.userInfo = action.payload
    })
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.loggedInUser = null
    })
  },
})

export const userReducer = usersSlice.reducer
