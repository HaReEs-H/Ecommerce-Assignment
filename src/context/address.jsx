import { createContext, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const AddressContext = createContext()

AddressProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

function AddressProvider({ children }) {
  const [selectedAddress, setSelectedAddress] = useState(null)
  const { loggedInUser } = useSelector((state) => {
    return state.users
  })
  const handleAddress = (event) => {
    setSelectedAddress(loggedInUser.addresses[event.target.value])
  }
  return (
    <AddressContext.Provider value={{ selectedAddress, handleAddress }}>
      {children}
    </AddressContext.Provider>
  )
}

export default AddressContext
export { AddressProvider }
