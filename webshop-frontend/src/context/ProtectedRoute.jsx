import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roles = [] }) {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role && roles.includes(role)) {
        return <Navigate to="/" replace />;
    }
    
    return children;
}
