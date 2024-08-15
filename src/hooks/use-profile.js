import { useContext } from 'react'
import ProfileContext from '../context/profile'

function useProfile() {
  return useContext(ProfileContext)
}

export default useProfile
