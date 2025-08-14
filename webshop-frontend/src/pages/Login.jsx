import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../script/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok && data.jwt) {
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('role', data.user.role_name);

                if (data.user.role_name === 'admin') {
                    navigate('/admin/books');
                } else {
                    navigate('/books');
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Network error');
        }
    };

    return (
        <div>
            <div>
                <h2>Login to Your Account</h2>

                {error && <div>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>

                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
