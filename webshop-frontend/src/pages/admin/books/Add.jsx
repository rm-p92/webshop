import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthors, getGenres, createBook } from '../../../script/api';

export default function AddBook() {
    const navigate = useNavigate();

    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        author_id: '',
        genre_id: '',
        cover_image: '',
    });

    useEffect(() => {
        getAuthors().then(setAuthors);
        getGenres().then(setGenres);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBook(form);
        navigate('/admin/books');
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Add Book</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Price"
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
                    placeholder="Cover Image URL"
                    value={form.cover_image}
                    onChange={(e) =>
                        setForm({ ...form, cover_image: e.target.value })
                    }
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
}
