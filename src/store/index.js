import { configureStore } from '@reduxjs/toolkit'
import { ProductReducer } from './slices/ProductListSlice'
import { userReducer } from './slices/usersSlice'
import { cartReducer } from './slices/cartSlice'
import { orderReducer } from './slices/ordersSlice'

const store = configureStore({
  reducer: {
    products: ProductReducer,
    users: userReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
})

export { store }
export * from './thunks/products/fetchProducts'
export * from './thunks/users/addUser'
export * from './thunks/users/getUser'
export * from './thunks/cart/addToCart'
export * from './thunks/cart/getCartByUser'
export * from './thunks/cart/updateCart'
export * from './thunks/cart/removeItemFromCart'
export * from './thunks/users/updateUser'
export * from './thunks/orders/addOrder'
export * from './thunks/cart/removeItemsFromCart'
export * from './thunks/users/fetchLoggedInUser'
export * from './thunks/orders/fetchLoggedInUserOrders'
export * from './thunks/users/signOutUser'
