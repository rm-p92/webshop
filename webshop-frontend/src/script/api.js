export const API_URL = import.meta.env.VITE_API_URL;

async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Always attach token if available
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        let errorData = {};
        try {
            errorData = await res.json();
        } catch {}
        throw new Error(errorData.error || 'Request failed');
    }

    try {
        return await res.json();
    } catch {
        return {};
    }
}

// Auth
export function fetchAuthorized() {
    return apiRequest('/authorized');
}

// Books CRUD
export function getBooks() {
    return apiRequest('/books');
}

export function getBook(id) {
    return apiRequest(`/books/${id}`);
}

export function createBook(book) {
    return apiRequest('/books', {
        method: 'POST',
        body: JSON.stringify({ book }),
    });
}

export function updateBook(id, book) {
    return apiRequest(`/books/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ book }),
    });
}

export function deleteBook(id) {
    return apiRequest(`/books/${id}`, {
        method: 'DELETE',
    });
}

// Metadata
export function getAuthors() {
    return apiRequest('/authors');
}

export function getGenres() {
    return apiRequest('/genres');
}
