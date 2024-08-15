import { useSelector } from 'react-redux'
import AddressShow from '../AddressShow'
import AddressForm from '../AddressForm'
import useProfile from '../../hooks/use-profile'

function UserProfile() {
  /*TODO: We will add payment section when we work 
  on backend*/

  const profile = true
  const newadd = true
  const { loggedInUser, userInfo } = useSelector((state) => {
    return state.users
  })
  const {
    selectedEditIndex,
    setSelectedEditIndex,
    showAddressForm,
    setShowAddressForm,
  } = useProfile()

  return (
    <>
      {userInfo.addresses.length === 0 ? (
        <p className="text-center text-gray-500">
          You don&apos;t have any addresses right now.
        </p>
      ) : (
        <div>
          <div
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
                Name :{' '}
                {userInfo.addresses[0].name
                  ? userInfo.addresses[0].name
                  : 'New User'}
              </h1>
              <h3
                className="text-xl my-5 
        font-bold tracking-tight text-red-900"
              >
                Email Address : {userInfo.email}
              </h3>
              <div>
                <button
                  type="submit"
                  className="rounded-md 
            bg-green-600 px-3 py-2 
            text-sm font-semibold 
            text-white shadow-sm 
            hover:bg-green-500 cursor-pointer 
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600"
                  onClick={() => {
                    setShowAddressForm(true)
                    setSelectedEditIndex(-1)
                  }}
                >
                  Add New Address
                </button>
              </div>
            </div>

            <div
              className="border-t border-gray-200 
        px-4 py-6 sm:px-6"
            >
              {showAddressForm && <AddressForm newadd={newadd} />}
              <p className="mt-2 text-sm text-gray-500">Your Address</p>
              {loggedInUser.addresses.map((address, index) => {
                return (
                  <div key={index}>
                    <AddressShow
                      address={address}
                      profile={profile}
                      index={index}
                      onEditClick={() => setSelectedEditIndex(index)}
                    />
                    {selectedEditIndex === index ? (
                      <AddressForm index={index} profile={profile} />
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserProfile
