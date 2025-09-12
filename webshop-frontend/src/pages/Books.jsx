import React, { useEffect, useState } from 'react';
import { getBooks, getAuthors, getGenres } from '../script/api';
import { useCart } from '../context/CartContext';
import { useAlert } from "../context/AlertContext";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [searching, setSearching] = useState(false);
    const [filtering, setFiltering] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { addItem } = useCart();
    const { showAlert } = useAlert();

    const fetchBooks = async ({
        searchTerm = "",
        authorId = "",
        genreId = "",
        pageNum = 1
    } = {}) => {
        setLoading(true);
        setError('');
        try {
            const data = await getBooks({
                search: searchTerm,
                author_id: authorId,
                genre_id: genreId,
                page: pageNum
            });
            setBooks(data.books || []);
            setTotalPages(data.total_pages || 1);
            setPage(data.current_page || 1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchFilters = async () => {
            setAuthors(await getAuthors());
            setGenres(await getGenres());
        };
        fetchFilters();
        fetchBooks();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        await fetchBooks({
            searchTerm: search,
            authorId,
            genreId,
            pageNum: 1
        });
        setSearching(false);
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        setFiltering(true);
        await fetchBooks({
            searchTerm: search,
            authorId,
            genreId,
            pageNum: 1
        });
        setFiltering(false);
    };

    const handlePageChange = async (newPage) => {
        await fetchBooks({
            searchTerm: search,
            authorId,
            genreId,
            pageNum: newPage
        });
    };

    const handleClearAll = async () => {
        setSearch('');
        setAuthorId('');
        setGenreId('');
        await fetchBooks({
            searchTerm: '',
            authorId: '',
            genreId: '',
            pageNum: 1
        });
    };

    const handleAddToCart = async (bookId) => {
        try {
            await addItem(bookId);
            showAlert("Item added to cart!", "success");
        } catch {
            showAlert("Failed to add item to cart", "error");
        }
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Books</h1>
            <form onSubmit={handleSearch} className="mb-4 flex gap-2 flex-wrap">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by title, author, genre..."
                    className="searchbar"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={searching}
                >
                    {searching ? "Searching..." : "Search"}
                </button>
            </form>
            <form onSubmit={handleFilter} className="mb-2 flex gap-4 flex-wrap">
                <div>
                    <select
                        value={authorId}
                        onChange={e => setAuthorId(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">All Authors</option>
                        {authors.map(author => (
                            <option key={author.id} value={author.id}>{author.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        value={genreId}
                        onChange={e => setGenreId(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">All Genres</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled={filtering}
                >
                    {filtering ? "Filtering..." : "Filter"}
                </button>
            </form>
            <div className='mb-6'>
                <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                    Clear All
                </button>
            </div>
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
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-3 py-1 mx-1 bg-blue-500 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-3 py-1">{page} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="px-3 py-1 mx-1 bg-blue-500 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}