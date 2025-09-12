import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

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
        window.location.reload();
    };

    return (
        <header className="flex justify-between items-center mb-12">
            <div> 
                <Link className="mb-0 !no-underline" to="/">
                    <h3 className="mb-0">WebShop</h3>
                </Link>
            </div>
            <div>
                <div className="flex items-center gap-12 font-semibold">
                    <Link to="/books">Books</Link>
                    {role !== 'admin' && (
                        <>
                            <Link to="/cart">Cart ({cartCount})</Link>
                        </>
                    )}
                    {role === "admin" && (
                        <>
                            <Link to="/admin">Admin</Link>
                        </>
                    )}
                    <Menu as="div" className="relative inline-block">
                        <MenuButton className=" mb-0 w-full rounded-full p-1 text-sm font-semibold text-white inset-ring-1 inset-ring-neutral-50 hover:bg-neutral-700">
                            <UserIcon className="size-4" />
                        </MenuButton>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            <div className="py-1">
                                {isLoggedIn ? (
                                    <>
                                        <MenuItem>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                                            >
                                                My Account
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a
                                                href="#"
                                                onClick={handleLogout}
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                                            >
                                                Logout
                                            </a>
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <a
                                                href="/login"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                                            >
                                                Login
                                            </a>
                                        </MenuItem>
                                        <MenuItem>
                                            <a
                                                href="/signup"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                                            >
                                                Sign Up
                                            </a>
                                        </MenuItem>
                                    </>
                                )}
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
            {/* <div>
                <div>
                    <UserIcon className="size-6" />
                </div>
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
            </div> */}
        </header>
    );
}