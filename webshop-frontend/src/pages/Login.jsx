import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../script/api';
import { useCart } from '../context/CartContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { reload } = useCart();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await loginApi(email, password);

            if (data.jwt) {
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('role', data.user.role_name);

                reload();

                if (data.user.role_name === 'admin') {
                    navigate('/admin/books');
                } else {
                    navigate('/books');
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch(e) {
            setError(e.message);
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
