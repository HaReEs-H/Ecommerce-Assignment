import { useEffect } from 'react'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage'
import Protected from './components/auth/Protected'
import { useSelector } from 'react-redux'
import useThunk from './hooks/use-thunk'
import { getCartByUser, fetchLoggedInUser } from './store'
import { PaymentProvider } from './context/payment'
import { AddressProvider } from './context/address'
import { ProfileProvider } from './context/profile'
import PageNotFound from './pages/404'
import OrderSuccessPage from './pages/OrderSuccessPage'
import UserOrdersPage from './pages/UserOrdersPage'
import UserProfilePage from './pages/UserProfilePage'
import Logout from './components/auth/Logout'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: 'checkout',
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: 'product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: '/order-success/:id',
    element: <OrderSuccessPage />,
  },
  {
    path: '/orders',
    element: <UserOrdersPage />,
  },
  {
    path: '/profile',
    element: <UserProfilePage />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
])

function App() {
  const { loggedInUser } = useSelector((state) => {
    return state.users
  })
  const [doGetCartByUser] = useThunk(getCartByUser)
  const [doFetchLoggedInUser] = useThunk(fetchLoggedInUser)
  useEffect(() => {
    if (loggedInUser && loggedInUser.id) {
      doGetCartByUser(loggedInUser.id)
      doFetchLoggedInUser(loggedInUser.id)
    }
  }, [doGetCartByUser, loggedInUser, doFetchLoggedInUser])
  return (
    <div>
      <ProfileProvider>
        <AddressProvider>
          <PaymentProvider>
            <RouterProvider router={router} />
          </PaymentProvider>
        </AddressProvider>
      </ProfileProvider>
    </div>
  )
}

export default App
