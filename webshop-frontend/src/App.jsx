import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CartProvider from "./context/CartContext";
import AlertProvider from "./context/AlertContext";
import BlockedRoute from './context/BlockedRoute';

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
                            <BlockedRoute roles={["admin"]}>
                                <Cart />
                            </BlockedRoute>
                        } />
                        <Route path="/checkout" element={
                            <BlockedRoute roles={["admin"]}>
                                <Checkout />
                            </BlockedRoute>
                        } />
                        <Route path="/orders" element={
                            <BlockedRoute roles={["admin"]}>
                                <Orders />
                            </BlockedRoute>
                        } />
                        <Route path="/orders/:id" element={
                            <BlockedRoute roles={["admin"]}>
                                <Order />
                            </BlockedRoute>
                        } />

                        <Route
                            path="/admin/"
                            element={
                                <BlockedRoute roles={["customer"]}>
                                    <AdminDashboard />
                                </BlockedRoute>
                            }
                        />
                        <Route
                            path="/admin/books"
                            element={
                                <BlockedRoute roles={["customer"]}>
                                    <BooksIndex />
                                </BlockedRoute>
                            }
                        />
                        <Route
                            path="/admin/books/add"
                            element={
                                <BlockedRoute roles={["customer"]}>
                                    <AddBook />
                                </BlockedRoute>
                            }
                        />
                        <Route
                            path="/admin/books/edit/:id"
                            element={
                                <BlockedRoute roles={["customer"]}>
                                    <EditBook />
                                </BlockedRoute>
                            }
                        />
                        <Route
                            path="/admin/books/:id"
                            element={
                                <BlockedRoute roles={["customer"]}>
                                    <ShowBook />
                                </BlockedRoute>
                            }
                        />

                        <Route
                            path="/admin/orders"
                            element={
                                <BlockedRoute roles={["customer"]}>
                                    <OrdersIndex />
                                </BlockedRoute>
                            }
                        />
                        <Route
                            path="/admin/orders/:id"
                            element={
                                <BlockedRoute roles={["customer"]}>
                                    <ShowOrder />
                                </BlockedRoute>
                            }
                        />

                    </Routes>
                </CartProvider>
            </AlertProvider>
        </Router>
    );
}