import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const { cart } = useCart();
    const cartCount = cart?.cart_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
        window.location.reload(); // refresh to reset UI
    };

    return (
        <header>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                {isLoggedIn ? (
                    <>
                        <span>Logged in</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <span>Not logged in</span>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
                {' | '}
                <Link to="/books">Books</Link>
                {role !== 'admin' && (
                    <>
                        {' | '}
                        <Link to="/cart">Cart ({cartCount})</Link>
                        {' | '}
                        <Link to="/orders">Orders</Link>
                    </>
                )}
                {role === "admin" && (
                    <>
                        {" | "}
                        <Link to="/admin">⚙️ Admin Dashboard</Link>
                    </>
                )}
            </div>
        </header>
    );
}