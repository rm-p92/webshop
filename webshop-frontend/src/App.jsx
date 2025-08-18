import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CartProvider from "./context/CartContext";
import AlertProvider from "./context/AlertContext";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Books from './pages/Books';
import Cart from './pages/cart/Index';
import Checkout from './pages/Checkout';

// Admin pages
import RequireAdmin from './components/RequireAdmin';
import BooksIndex from './pages/admin/books/Index';
import AddBook from './pages/admin/books/Add';
import EditBook from './pages/admin/books/Edit';
import ShowBook from './pages/admin/books/Show';

function Home() {
    const isLoggedIn = !!localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return (
        <div>
            <h1>Welcome to Webshop</h1>

            {!isLoggedIn && (
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </nav>
            )}

            {isLoggedIn && (
                <nav>
                    <Link to="/books">Books</Link>
                    {role == 'admin' && (
                        <>
                            {' | '}
                            <Link to="/admin/books">Manage Books</Link>
                        </>
                    )}
                </nav>
            )}
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <AlertProvider>
                <CartProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />

                        <Route
                            path="/admin/books"
                            element={
                                <RequireAdmin>
                                    <BooksIndex />
                                </RequireAdmin>
                            }
                        />
                        <Route
                            path="/admin/books/add"
                            element={
                                <RequireAdmin>
                                    <AddBook />
                                </RequireAdmin>
                            }
                        />
                        <Route
                            path="/admin/books/edit/:id"
                            element={
                                <RequireAdmin>
                                    <EditBook />
                                </RequireAdmin>
                            }
                        />
                        <Route
                            path="/admin/books/:id"
                            element={
                                <RequireAdmin>
                                    <ShowBook />
                                </RequireAdmin>
                            }
                        />
                    </Routes>
                </CartProvider>
            </AlertProvider>
        </Router>
    );
}