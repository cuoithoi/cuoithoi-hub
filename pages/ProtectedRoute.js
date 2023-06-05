import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return (window.location.href = '/')
  }
  return <Outlet />
}

export default ProtectedRoute
