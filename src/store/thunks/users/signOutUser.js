import { createAsyncThunk } from '@reduxjs/toolkit'

const signOutUser = createAsyncThunk('user/signout', () => {
  // On server we will remove user session info
})

export { signOutUser }
