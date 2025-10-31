import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../data/auth';

export default function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" replace />;
}