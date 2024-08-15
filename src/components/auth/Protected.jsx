import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

Protected.propTypes = {
  children: PropTypes.node.isRequired,
}

function Protected({ children }) {
  const { loggedInUser } = useSelector((state) => state.users)
  if (!loggedInUser) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}

export default Protected
