import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../../../script/api';

export default function BooksIndex() {
    const [books, setBooks] = useState([]);
    const role = localStorage.getItem('role');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        getBooks()
            .then(setBooks)
            .catch((err) => console.error('Error fetching books:', err));
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this book?')) return;
        try {
            await deleteBook(id);
            loadBooks();
        } catch (err) {
            console.error('Error deleting book:', err);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>📚 Manage Books</h1>
            <Link to="/admin/books/add">➕ Add New Book</Link>
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
        </div>
    );
}
