import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectUser } from '../../redux/user'

const ProtectedRoute = () => {
  const user = useSelector(selectUser)
  if (!user.authData?.userId) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
