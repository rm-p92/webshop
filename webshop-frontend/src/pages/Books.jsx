import React, { useEffect, useState } from 'react';
import { getBooks, addToCart } from '../script/api';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { loadCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    const handleAddToCart = async (bookId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            await addToCart(bookId);
            loadCart();
        } catch (err) {
            alert("Failed to add to cart");
        }
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Books</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="border rounded-lg shadow p-4 bg-white"
                    >
                        <img
                            src={book.cover_image}
                            alt={book.title}
                            className="w-full h-60 object-cover mb-3 rounded"
                        />
                        <h2 className="font-semibold text-lg">{book.title}</h2>
                        <p className="text-sm text-gray-600 mb-1">
                            {book.author?.name}
                        </p>

                        {/* Show all genre layers */}
                        <p className="text-xs text-gray-500 mb-2">
                            {book.genre_hierarchy?.join(' → ')}
                        </p>

                        <p className="text-gray-700 text-sm line-clamp-3 mb-2">
                            {book.description}
                        </p>
                        <p className="font-bold">${book.price}</p>

                        <button
                            onClick={() => handleAddToCart(book.id)}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}