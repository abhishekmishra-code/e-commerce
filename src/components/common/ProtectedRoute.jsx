import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const status = useSelector(state => state.auth.status)

  if (status !== 'authenticated') {
    return <Navigate to={'/login'} />
  }

  return children;
};

export default ProtectedRoute;