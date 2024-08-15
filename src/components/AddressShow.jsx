import useThunk from '../hooks/use-thunk'
import { updateUser } from '../store'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

AddressShow.propTypes = {
  address: PropTypes.shape({
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    pinCode: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleAddress: PropTypes.func,
  profile: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

function AddressShow({ address, index, handleAddress, profile, onEditClick }) {
  const [doUpdateUser] = useThunk(updateUser)

  const { userInfo } = useSelector((state) => {
    return state.users
  })

  const handleRemove = (event, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1)
    doUpdateUser(newUser)
  }

  return (
    <li
      key={index}
      className="flex 
                justify-between 
                gap-x-6 py-5 mb-4
                border-solid 
                border-2 px-5
                border-gray"
    >
      <div className="flex min-w-0 gap-x-4">
        {handleAddress && (
          <input
            onChange={handleAddress}
            id="cash"
            name="address"
            type="radio"
            value={index}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        )}
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {address.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {address.street}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {address.pinCode}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">
          Phone : {address.phone}
        </p>
        <p className="text-sm leading-6 text-gray-500">{address.city}</p>
      </div>
      {profile && (
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <button
            onClick={() => onEditClick()}
            type="button"
            className="font-medium text-indigo-600 
            hover:text-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={(e) => handleRemove(e, index)}
            type="button"
            className="font-medium text-indigo-600 
              hover:text-indigo-500"
          >
            Remove
          </button>
        </div>
      )}
    </li>
  )
}

export default AddressShow
