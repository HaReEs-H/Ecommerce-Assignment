import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useThunk from '../../hooks/use-thunk'
import { signOutUser } from '../../store'
import { useSelector } from 'react-redux'

function Logout() {
  const [doSignOut] = useThunk(signOutUser)
  const { loggedInUser } = useSelector((state) => {
    return state.users
  })
  useEffect(() => {
    doSignOut()
  })
  /*useEffect runs after render,
  so we have to delay navigate part*/
  return <>{!loggedInUser && <Navigate to="/login" replace={true} />}</>
}

export default Logout
