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

export function login(email, password) {
    return apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export function signup(email, password) {
    return apiRequest('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export function getBooks({ search = "", author_id = "", genre_id = "", page = 1, per_page = 12 } = {}) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (author_id) params.append("author_id", author_id);
    if (genre_id) params.append("genre_id", genre_id);
    params.append("page", page);
    params.append("per_page", per_page);
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiRequest(`/books${query}`);
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

// Cart
export function getCart() {
    return apiRequest("/cart"); // GET /cart
}

export function addToCart(book_id, quantity = 1) {
    return apiRequest("/cart/add", {
        method: "POST",
        body: JSON.stringify({ book_id, quantity }),
    });
}

export function updateCartItem(itemId, quantity) {
    return apiRequest(`/cart/update/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity }),
    });
}

export function removeFromCart(itemId) {
    return apiRequest(`/cart/remove/${itemId}`, {
        method: "DELETE",
    });
}

// Orders
export function getOrders() {
    return apiRequest("/orders");
}

export function getAllOrders() {
  return apiRequest("/orders/all");
}

export function getOrder(id) {
    return apiRequest(`/orders/${id}`);
}

export function createOrder() {
    return apiRequest("/orders", {
        method: "POST",
    });
}

export function updateOrder(id, status) {
    return apiRequest(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status })
    });
}

export async function deleteOrder(id) {
  return apiRequest(`/orders/${id}`, {
    method: "DELETE",
  });
}