// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { getCartByUser } from './getCartByUser'
// import { removeItemFromCart } from './removeItemFromCart'
// import useThunk from '../../../hooks/use-thunk'

// const removeItemsFromCart = createAsyncThunk('cart/remove', async (userId) => {
//   //Get all items of user and then delete
//   const [doCartByUser] = useThunk(getCartByUser)
//   const [doRemoveItem] = useThunk(removeItemFromCart)
//   try {
//     const response1 = await doCartByUser(userId)
//     console.log(response1)
//     const items = response1.payload
//     for (let item of items) {
//       await doRemoveItem(item)
//     }
//   } catch (error) {
//     console.error('Error removing items from cart:', error)
//     throw error
//   }
//   return 'Done.'
// })

// export { removeItemsFromCart }

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCartByUser } from './getCartByUser'
import { removeItemFromCart } from './removeItemFromCart'

const removeItemsFromCart = createAsyncThunk(
  'cart/remove',
  async (userId, { dispatch }) => {
    try {
      // Get all items of the user
      const response1 = await dispatch(getCartByUser(userId))
      const items = response1.payload

      // Remove each item from the cart
      for (let item of items) {
        await dispatch(removeItemFromCart(item.id))
      }

      return 'Done.'
    } catch (error) {
      // Handle errors if needed
      console.error('Error removing items from cart:', error)
      throw error
    }
  }
)

export { removeItemsFromCart }
