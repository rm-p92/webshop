import { Navigate } from 'react-router-dom';

export default function BlockedRoute({ children, roles = [] }) {
    const role = localStorage.getItem('role');

    if (roles.includes(role)) {
        return <Navigate to="/" replace />;
    }
    
    return children;
}
