import { useEffect } from 'react'
import useThunk from '../../hooks/use-thunk'
import { fetchLoggedInUserOrders } from '../../store/thunks/orders/fetchLoggedInUserOrders'
import { useSelector } from 'react-redux'
import AddressShow from '../AddressShow'

function UserOrders() {
  const [doFetchUserOrder] = useThunk(fetchLoggedInUserOrders)

  const { userInfo } = useSelector((state) => {
    return state.users
  })

  const { userOrders } = useSelector((state) => {
    return state.orders
  })

  useEffect(() => {
    doFetchUserOrder(userInfo.id)
  }, [doFetchUserOrder, userInfo.id])

  return (
    <div>
      {userOrders.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        userOrders.map((order) => (
          <div
            key={order.id}
            className="mx-auto
            bg-white max-w-7xl px-0 
            sm:px-0 lg:px-0 mt-12"
          >
            <div
              className="border-t
                   border-gray-200 px-4 py-6 
                   sm:px-6"
            >
              <h1
                className="text-4xl my-5 
                  font-bold tracking-tight text-gray-900"
              >
                Order # {order.id}
              </h1>
              <h3
                className="text-xl my-5 
                  font-bold tracking-tight text-red-900"
              >
                Order Status : {order.status}
              </h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
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
                              Qty : {item.quantity}
                            </label>
                          </div>

                          <div className="flex"></div>
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
                <p>${order.totalAmount}</p>
              </div>
              <div
                className="flex my-2 justify-between mt-4 
              text-base font-medium text-gray-900"
              >
                <p>Total Items in Cart</p>
                <p>{order.totalItems} items</p>
              </div>
              <p className="mt-2 text-sm text-gray-500">Shipping Address</p>
              <AddressShow address={order.selectedAddress} />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default UserOrders
