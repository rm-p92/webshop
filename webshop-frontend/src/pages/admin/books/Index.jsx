import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook, getAuthors, getGenres } from '../../../script/api';

export default function BooksIndex() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [search, setSearch] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchFilters();
        fetchBooks();
    }, []);

    const fetchFilters = async () => {
        setAuthors(await getAuthors());
        setGenres(await getGenres());
    };

    const fetchBooks = async ({ searchTerm = '', authorId = '', genreId = '', pageNum = 1 } = {}) => {
        setLoading(true);
        try {
            const data = await getBooks({ search: searchTerm, author_id: authorId, genre_id: genreId, page: pageNum });
            setBooks(data.books || []);
            setTotalPages(data.total_pages || 1);
            setPage(data.current_page || 1);
        } catch (err) {
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchAndFilter = async (e) => {
        e.preventDefault();
        await fetchBooks({ searchTerm: search, authorId, genreId, pageNum: 1 });
    };

    const handleClearAll = async () => {
        setSearch('');
        setAuthorId('');
        setGenreId('');
        await fetchBooks({ searchTerm: '', authorId: '', genreId: '', pageNum: 1 });
    };

    const handlePageChange = async (newPage) => {
        await fetchBooks({ searchTerm: search, authorId, genreId, pageNum: newPage });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this book?')) return;
        try {
            await deleteBook(id);
            await fetchBooks({ searchTerm: search, authorId, genreId, pageNum: page });
        } catch (err) {
            // handle error
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>📚 Manage Books</h1>
            <Link to="/admin/books/add">➕ Add New Book</Link>
            <form onSubmit={handleSearchAndFilter} style={{ margin: '1rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by title, author, genre..."
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
                />
                <select
                    value={authorId}
                    onChange={e => setAuthorId(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">All Authors</option>
                    {authors.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
                <select
                    value={genreId}
                    onChange={e => setGenreId(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '4px', border: 'none' }}
                >
                    Search & Filter
                </button>
                <button
                    type="button"
                    onClick={handleClearAll}
                    style={{ padding: '0.5rem 1rem', background: '#6b7280', color: 'white', borderRadius: '4px', border: 'none' }}
                >
                    Clear All
                </button>
            </form>
            {loading ? (
                <p>Loading books...</p>
            ) : (
                <ul>
                    {books.map((b) => (
                        <li key={b.id}>
                            <strong>{b.title}</strong> — ${b.price}{' '}
                            <Link to={`/admin/books/${b.id}`}>View</Link>{' '}
                            <Link to={`/admin/books/edit/${b.id}`}>Edit</Link>{' '}
                            <button onClick={() => handleDelete(b.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem' }}>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '4px', border: 'none', opacity: page <= 1 ? 0.5 : 1 }}
                >
                    Prev
                </button>
                <span style={{ padding: '0.5rem 1rem' }}>{page} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: '4px', border: 'none', opacity: page >= totalPages ? 0.5 : 1 }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
