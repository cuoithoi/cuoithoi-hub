import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {

  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return window.location.href = "/"
  }
  return children

}

export default ProtectedRoute
