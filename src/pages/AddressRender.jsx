import { useSelector } from 'react-redux'
import { useContext } from 'react'
import AddressContext from '../context/address'
import AddressShow from '../components/AddressShow'

// const addresses = [
//   {
//     name: 'Leslie Alexander',
//     street: '11th main',
//     city: 'Delhi',
//     state: 'Delhi',
//     pincode: 123434,
//     phonenumber: 86756565,
//   },
//   {
//     name: 'Leslie Alexander',
//     street: '15th main',
//     city: 'Hyderabad',
//     state: 'Telangana',
//     pincode: 123434,
//     phonenumber: 86756565,
//   },
// ]

function AddressesRender() {
  // const [selectedAddress, setSelectedAddress] = useState(null)

  const { loggedInUser } = useSelector((state) => {
    return state.users
  })
  // const handleAddress = (event) => {
  //   setSelectedAddress(loggedInUser.addresses[event.target.value])
  // }
  const { handleAddress } = useContext(AddressContext)
  return (
    <ul>
      {loggedInUser.addresses.map((address, index) => (
        <AddressShow
          key={index}
          address={address}
          index={index}
          handleAddress={handleAddress}
        />
      ))}
    </ul>
  )
}

export default AddressesRender
