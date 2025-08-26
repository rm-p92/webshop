import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CartProvider from "./context/CartContext";
import AlertProvider from "./context/AlertContext";
import ProtectedRoute from './context/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import Books from './pages/Books';
import Cart from './pages/cart/Index';
import Checkout from './pages/Checkout';
import Orders from './pages/order/Index';
import Order from "./pages/order/Show";

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import BooksIndex from './pages/admin/books/Index';
import AddBook from './pages/admin/books/Add';
import EditBook from './pages/admin/books/Edit';
import ShowBook from './pages/admin/books/Show';
import OrdersIndex from './pages/admin/orders/Index';
import ShowOrder from './pages/admin/orders/Show';

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
                    {role !== 'admin' && (
                        <>
                            {' | '}
                            <Link to="/cart">Cart</Link>
                            {' | '}
                            <Link to="/orders">Orders</Link>
                        </>
                    )}
                    {role === 'admin' && (
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
                        <Route path="/cart" element={
                            <ProtectedRoute roles={["admin"]}>
                                <Cart />
                            </ProtectedRoute>
                        } />
                        <Route path="/checkout" element={
                            <ProtectedRoute roles={["admin"]}>
                                <Checkout />
                            </ProtectedRoute>
                        } />
                        <Route path="/orders" element={
                            <ProtectedRoute roles={["admin"]}>
                                <Orders />
                            </ProtectedRoute>
                        } />
                        <Route path="/orders/:id" element={
                            <ProtectedRoute roles={["admin"]}>
                                <Order />
                            </ProtectedRoute>
                        } />

                        <Route
                            path="/admin/"
                            element={
                                <ProtectedRoute roles={["customer"]}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/books"
                            element={
                                <ProtectedRoute roles={["customer"]}>
                                    <BooksIndex />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/books/add"
                            element={
                                <ProtectedRoute roles={["customer"]}>
                                    <AddBook />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/books/edit/:id"
                            element={
                                <ProtectedRoute roles={["customer"]}>
                                    <EditBook />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/books/:id"
                            element={
                                <ProtectedRoute roles={["customer"]}>
                                    <ShowBook />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/admin/orders"
                            element={
                                <ProtectedRoute roles={["customer"]}>
                                    <OrdersIndex />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/orders/:id"
                            element={
                                <ProtectedRoute roles={["customer"]}>
                                    <ShowOrder />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>
                </CartProvider>
            </AlertProvider>
        </Router>
    );
}