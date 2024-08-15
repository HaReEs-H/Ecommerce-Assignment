import Cart from '../components/Cart'
import AddressesRender from './AddressRender'
import usePayment from '../hooks/use-payment'
import AddressForm from '../components/AddressForm'

function Checkout() {
  // const [paymentMethod, setPaymentMethod] = useState('cash')

  // const handlePayment = (event) => {
  //   setPaymentMethod(event.target.value)
  // }

  const { paymentMethod, handlePayment } = usePayment()

  return (
    <div
      className="mx-auto 
        max-w-7xl px-4 
        sm:px-6 lg:px-8"
    >
      <div
        className="grid grid-cols-1 
        gap-x-8 gap-y-10 lg:grid-cols-5"
      >
        <div className="lg:col-span-3">
          <AddressForm />
          <div
            className="border-b 
                border-gray-900/10 pb-12 bg-white px-3"
          >
            <h2
              className="text-base 
                  font-semibold leading-7 text-gray-900"
            >
              Address
            </h2>
            <p
              className="mt-1 
                    text-sm mb-2
                    leading-6
                     text-gray-600"
            >
              Choose from existing address
            </p>
            <AddressesRender />

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend
                  className="text-sm 
                        font-semibold leading-6 
                        text-gray-900"
                >
                  Payment Methods
                </legend>
                <p
                  className="mt-1 text-sm
                     leading-6 text-gray-600"
                >
                  Choose One
                </p>
                <div className="mt-6 space-y-6">
                  <div
                    className="flex 
                      items-center gap-x-3"
                  >
                    <input
                      id="cash"
                      name="payments"
                      onChange={handlePayment}
                      value="cash"
                      type="radio"
                      checked={paymentMethod === 'cash'}
                      className="h-4 w-4 
                          border-gray-300 
                          text-indigo-600 
                          focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="cash"
                      className="block text-sm
                           font-medium leading-6 
                           text-gray-900"
                    >
                      Cash
                    </label>
                  </div>
                  <div
                    className="flex items-center
                       gap-x-3"
                  >
                    <input
                      id="card"
                      name="payments"
                      onChange={handlePayment}
                      value="card"
                      type="radio"
                      checked={paymentMethod === 'card'}
                      className="h-4 w-4
                           border-gray-300 
                           text-indigo-600 
                           focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="card"
                      className="block text-sm
                           font-medium leading-6 
                           text-gray-900"
                    >
                      Card
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <Cart checkOutName="Order Now" />
        </div>
      </div>
    </div>
  )
}

export default Checkout
