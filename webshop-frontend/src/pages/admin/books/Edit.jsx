import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getAuthors,
    getGenres,
    getBook,
    updateBook,
} from '../../../script/api';

export default function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [form, setForm] = useState(null);

    useEffect(() => {
        getBook(id).then(setForm);
        getAuthors().then(setAuthors);
        getGenres().then(setGenres);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBook(id, form);
        navigate('/admin/books');
    };

    if (!form) return <p>Loading...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />
                <textarea
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
                <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                    }
                />

                <select
                    value={form.author_id}
                    onChange={(e) =>
                        setForm({ ...form, author_id: e.target.value })
                    }
                >
                    <option value="">Select Author</option>
                    {authors.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>

                <select
                    value={form.genre_id}
                    onChange={(e) =>
                        setForm({ ...form, genre_id: e.target.value })
                    }
                >
                    <option value="">Select Genre</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                <input
                    value={form.cover_image}
                    onChange={(e) =>
                        setForm({ ...form, cover_image: e.target.value })
                    }
                />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
