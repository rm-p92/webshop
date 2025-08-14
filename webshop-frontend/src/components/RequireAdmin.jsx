import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}
