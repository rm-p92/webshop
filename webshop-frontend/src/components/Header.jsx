import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem 0' }}>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <span style={{ color: 'green' }}>Logged in</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <span style={{ color: 'red' }}>Not logged in</span>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </header>
  );
}