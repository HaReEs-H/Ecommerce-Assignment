import { useContext } from 'react'
import PaymentContext from '../context/payment'

function usePayment() {
  return useContext(PaymentContext)
}

export default usePayment
