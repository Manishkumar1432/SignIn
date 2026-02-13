import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/signin" replace />;
    return children;
  } catch (e) {
    return <Navigate to="/signin" replace />;
  }
}