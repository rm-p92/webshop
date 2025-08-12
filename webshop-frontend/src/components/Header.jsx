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
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-lg font-semibold hover:text-indigo-400">
          Home
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <span className="text-green-400 font-medium">Logged in</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span className="text-red-400 font-medium">Not logged in</span>
            <Link
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
