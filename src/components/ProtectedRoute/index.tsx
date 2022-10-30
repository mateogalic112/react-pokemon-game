import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../../redux/user'

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser)
  if (!user.authData?.userId) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
