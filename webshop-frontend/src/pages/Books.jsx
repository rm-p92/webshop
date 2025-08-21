import React, { useEffect, useState } from 'react';
import { getBooks } from '../script/api';
import { useCart } from '../context/CartContext';
import { useAlert } from "../context/AlertContext";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);
    const { addItem } = useCart();
    const { showAlert } = useAlert();

    // Fetch books (with optional search)
    const fetchBooks = async (searchTerm = "") => {
        setLoading(true);
        setError('');
        try {
            const data = await getBooks(searchTerm);
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        await fetchBooks(search);
        setSearching(false);
    };

    const handleAddToCart = async (bookId) => {
        try {
            await addItem(bookId);
            showAlert("Item added to cart!", "success");
        } catch {
            showAlert("Failed to add item to cart", "error");
        }
    }

    if (loading) return <p>Loading books...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Books</h1>
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by title, author, genre..."
                    className="border px-3 py-2 rounded w-full max-w-xs"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={searching}
                >
                    {searching ? "Searching..." : "Search"}
                </button>
            </form>
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
                        <p className="text-xs text-gray-500 mb-2">
                            {book.genre_hierarchy?.join(' → ')}
                        </p>
                        <p className="text-gray-700 text-sm line-clamp-3 mb-2">
                            {book.description}
                        </p>
                        <p className="font-bold">${book.price}</p>
                        <button
                            onClick={() => handleAddToCart(book.id)}
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}