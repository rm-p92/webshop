import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup as signupApi } from '../script/api';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await signupApi(email, password);

            if (data.jwt) {
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('role', data.user.role_name);

                if (data.user.role_name === 'admin') {
                    navigate('/admin/books');
                } else {
                    navigate('/books');
                }
            } else {
                setError(
                    data.errors?.join(', ') || data.error || 'Signup failed'
                );
            }
        } catch(e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <div>
                <h2>Create an Account</h2>

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

                    <button type="submit">Sign Up</button>
                </form>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
