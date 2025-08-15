import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBook } from '../../../script/api';

export default function ShowBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        getBook(id).then(setBook);
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h1>{book.title}</h1>
            <img
                src={book.cover_image}
                alt={book.title}
                style={{ width: '200px' }}
            />
            <p>
                <strong>Price:</strong> ${book.price}
            </p>
            <p>
                <strong>Description:</strong> {book.description}
            </p>
            <p>
                <strong>Author:</strong> {book.author?.name}
            </p>
            <p>
                <strong>Genre:</strong>{' '}
                {book.genre_hierarchy?.join(' → ') || '—'}
            </p>

            <div style={{ marginTop: '1rem' }}>
                <Link to={`/admin/books/edit/${book.id}`}>Edit</Link> |{' '}
                <Link to="/admin/books">Back to List</Link>
            </div>
        </div>
    );
}
