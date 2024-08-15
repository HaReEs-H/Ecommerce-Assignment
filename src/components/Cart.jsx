import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import useThunk from '../hooks/use-thunk'
import { updateCart, removeItemFromCart, addOrder } from '../store'
import usePayment from '../hooks/use-payment'
import AddressContext from '../context/address'
import PropTypes from 'prop-types'

Cart.propTypes = {
  checkOutName: PropTypes.string.isRequired,
}

function Cart({ checkOutName }) {
  const [open, setOpen] = useState(true)
  const checkOutUrl = checkOutName === 'Order Now' ? '/pay' : '/checkout'
  const { items } = useSelector((state) => {
    return state.cart
  })
  const totalAmount = items.reduce((amount, item) => {
    return item.price * item.quantity + amount
  }, 0)
  const totalItems = items.reduce((total, item) => {
    return item.quantity + total
  }, 0)

  const [doUpdateCart] = useThunk(updateCart)
  const [doDeleteFromCart] = useThunk(removeItemFromCart)
  const [doCreateOrder] = useThunk(addOrder)

  const handleQuantity = (event, item) => {
    doUpdateCart({ ...item, quantity: +event.target.value })
  }

  const handleRemove = (itemID) => {
    doDeleteFromCart(itemID)
  }

  const { loggedInUser } = useSelector((state) => {
    return state.users
  })
  const { currentOrder } = useSelector((state) => {
    return state.orders
  })

  const { paymentMethod } = usePayment()
  const { selectedAddress } = useContext(AddressContext)

  const handleOrder = () => {
    const order = {
      items,
      totalAmount,
      totalItems,
      loggedInUser,
      paymentMethod,
      selectedAddress,
      status: 'Pending', //Other status can be delivered,dispatched.
    }
    doCreateOrder(order)
    /*
    TODO:
    Redirect to order success page
    Clear cart after order
    On server change the stock number of items
    */
  }

  return (
    <>
      {/* {items.length === 0 && <Navigate to="/" replace={true} />} */}
      {items.length === 0 ? (
        <div className="px-4 py-6 sm:px-6">
          <p className="text-center text-gray-500">Your cart is empty</p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/"
              className="font-medium 
          text-indigo-600 
          hover:text-indigo-500"
            >
              Continue Shopping &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <>
          {currentOrder && (
            <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
          )}
          <div
            className="border-t
             border-gray-200 px-4 py-6 
             sm:px-6"
          >
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.title}</a>
                          </h3>
                          <p className="ml-4">${item.price}</p>
                        </div>
                        <p
                          className="mt-1 text-sm 
                    text-gray-500"
                        >
                          {item.brand}
                        </p>
                      </div>
                      <div
                        className="flex flex-1 items-end
                   justify-between text-sm"
                      >
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm 
                        font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(event) => handleQuantity(event, item)}
                            className="rounded"
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            onClick={() => handleRemove(item.id)}
                            type="button"
                            className="font-medium 
                        text-indigo-600 
                        hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="border-t border-gray-200 
      px-4 py-6 sm:px-6"
          >
            <div
              className="flex justify-between 
        text-base font-medium my-2 text-gray-900"
            >
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div
              className="flex my-2 justify-between mt-4 
        text-base font-medium text-gray-900"
            >
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              {checkOutName === 'Check Out' ? (
                <Link
                  to={checkOutUrl}
                  className="flex items-center justify-center 
              rounded-md border border-transparent 
              bg-indigo-600 px-6 py-3 text-base font-medium
              text-white shadow-sm hover:bg-indigo-700"
                >
                  {checkOutName}
                </Link>
              ) : (
                <div
                  onClick={handleOrder}
                  className="flex cursor-pointer items-center justify-center 
                rounded-md border border-transparent 
                bg-indigo-600 px-6 py-3 text-base font-medium
                text-white shadow-sm hover:bg-indigo-700"
                >
                  {checkOutName}
                </div>
              )}
            </div>
            <div
              className="mt-6 flex justify-center 
        text-center text-sm text-gray-500"
            >
              <p>
                or{' '}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600
                 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Cart
