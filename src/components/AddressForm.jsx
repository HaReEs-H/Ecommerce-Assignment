import { useForm } from 'react-hook-form'
import useProfile from '../hooks/use-profile'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

AddressForm.propTypes = {
  profile: PropTypes.any,
  index: PropTypes.number.isRequired,
  newadd: PropTypes.bool.isRequired,
}

function AddressForm({ profile, index, newadd }) {
  // const [doUpdateUser] = useThunk(updateUser)
  const { userInfo } = useSelector((state) => {
    return state.users
  })
  const { handleEdit, selectedEditIndex, setSelectedEditIndex, handleAdd } =
    useProfile()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    if (selectedEditIndex === index) {
      setValue('name', userInfo.addresses[index].name)
      setValue('email', userInfo.addresses[index].email)
      setValue('phone', userInfo.addresses[index].phone)
      setValue('street', userInfo.addresses[index].street)
      setValue('city', userInfo.addresses[index].city)
      setValue('state', userInfo.addresses[index].state)
      setValue('pinCode', userInfo.addresses[index].pinCode)
    }
  }, [index, selectedEditIndex, setValue, userInfo.addresses])
  return (
    <form
      className="bg-white px-5 py-12 mt-12"
      noValidate
      onSubmit={handleSubmit((data) => {
        if (newadd) {
          handleAdd(data)
        } else {
          handleEdit(data, index)
        }
        reset()
      })}
    >
      <div className="space-y-12">
        <div
          className="border-b
          border-gray-900/10 pb-12"
        >
          <h2
            className="text-2xl
            font-semibold
            leading-7
            text-gray-900"
          >
            Personal Information
          </h2>
          <p
            className="mt-1 
            text-sm leading-6
            text-gray-600"
          >
            Use a permanent address where you can receive mail.
          </p>

          <div
            className="mt-10 grid grid-cols-1 
            gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm 
                font-medium leading-6 
                text-gray-900"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  id="name"
                  className="block w-full 
                  rounded-md border-0 py-1.5 
                  text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 sm:text-sm 
                  sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm 
                font-medium leading-6
                text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                  })}
                  type="email"
                  className="block w-full 
                  rounded-md border-0 py-1.5 
                  text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 sm:text-sm
                  sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm 
                font-medium leading-6 
                text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register('phone', {
                    required: 'Phone is required',
                  })}
                  type="tel"
                  className="block w-full 
                  rounded-md border-0 py-1.5 
                  text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 sm:text-sm
                  sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm 
                font-medium leading-6 
                text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street', {
                    required: 'Street is required',
                  })}
                  id="street"
                  className="block w-full
                  rounded-md border-0 py-1.5
                  text-gray-900 shadow-sm 
                  ring-1 ring-inset ring-gray-300
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600 
                  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div
              className="sm:col-span-2 
              sm:col-start-1"
            >
              <label
                htmlFor="city"
                className="block text-sm 
                font-medium leading-6 
                text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  id="city"
                  className="block w-full 
                  rounded-md border-0 py-1.5
                  text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 
                  placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset 
                  focus:ring-indigo-600 sm:text-sm
                  sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium 
                leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state', {
                    required: 'State is required',
                  })}
                  id="region"
                  className="block w-full 
                  rounded-md border-0 py-1.5 
                  text-gray-900 shadow-sm ring-1
                  ring-inset ring-gray-300
                  placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600
                  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="pinCode"
                className="block text-sm
                font-medium leading-6
                text-gray-900"
              >
                Pin code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode', {
                    required: 'Pincode is required',
                  })}
                  id="pinCode"
                  className="block w-full
                  rounded-md border-0
                  py-1.5 text-gray-900
                  shadow-sm ring-1 
                  ring-inset ring-gray-300
                  placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset
                  focus:ring-indigo-600
                  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-6 flex 
          items-center justify-end gap-x-6"
        >
          {/* {profile && (
            <button
              type="button"
              className="text-sm 
              font-semibold leading-6 
              text-gray-900"
              onClick={() => setSelectedEditIndex(-1)}
            >
              Cancel
            </button>
          )}
          {!profile && (
            <button
              type="button"
              className="text-sm 
              font-semibold leading-6 
              text-gray-900"
            >
              Reset
            </button>
          )} */}
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => (profile ? setSelectedEditIndex(-1) : null)}
          >
            {profile ? 'Cancel' : 'Reset'}
          </button>
          <button
            type="submit"
            className="rounded-md 
            bg-indigo-600 px-3 py-2 
            text-sm font-semibold 
            text-white shadow-sm 
            hover:bg-indigo-500 
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600"
          >
            {profile ? 'Edit Address' : 'Add Address'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddressForm
