import { createSlice } from '@reduxjs/toolkit'
import { addOrder } from '../thunks/orders/addOrder'
import { fetchLoggedInUserOrders } from '../thunks/orders/fetchLoggedInUserOrders'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orderedItems: [],
    currentOrder: null,
    userOrders: [],
  },
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null
    },
  },
  //We may need more info of current order
  extraReducers(builder) {
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.orderedItems.push(action.payload)
      state.currentOrder = action.payload
    })
    builder.addCase(fetchLoggedInUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload
    })
  },
})

export const orderReducer = ordersSlice.reducer
export const { resetOrder } = ordersSlice.actions
