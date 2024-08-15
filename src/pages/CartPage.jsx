import Navbar from '.././components/navbar/Navbar'
import Cart from '../components/Cart'

function CartPage() {
  return (
    <Navbar>
      <h1 className="mx-auto text-4xl bold">Cart</h1>
      <Cart checkOutName="Check Out" />
    </Navbar>
  )
}

export default CartPage
