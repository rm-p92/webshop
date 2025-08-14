import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';

function Home() {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div>
            <div>
                <h1>Welcome to Webshop</h1>

                {!isLoggedIn && (
                    <nav>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </nav>
                )}

                {isLoggedIn && <p>You are logged in!</p>}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}
