import { createContext, useState } from 'react'
import { useSelector } from 'react-redux'
import useThunk from '../hooks/use-thunk'
import { updateUser } from '../store'
import PropTypes from 'prop-types'

const ProfileContext = createContext()

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

function ProfileProvider({ children }) {
  const [doUpdateUser] = useThunk(updateUser)
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const { userInfo } = useSelector((state) => {
    return state.users
  })
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1, addressUpdate)
    doUpdateUser(newUser)
    setSelectedEditIndex(-1)
  }
  const handleAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }
    doUpdateUser(newUser)
    setShowAddressForm(false)
  }
  return (
    <ProfileContext.Provider
      value={{
        setSelectedEditIndex,
        selectedEditIndex,
        handleEdit,
        handleAdd,
        showAddressForm,
        setShowAddressForm,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
export { ProfileProvider }
