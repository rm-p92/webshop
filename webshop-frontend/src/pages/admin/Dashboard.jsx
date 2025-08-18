import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>⚙️ Admin Dashboard</h1>
            <p>Welcome, Admin! Choose a section to manage:</p>

            <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                    <Link to="/admin/books">📚 Manage Books</Link>
                </li>
                <li>
                    <Link to="/admin/orders">📦 Manage Orders</Link>
                </li>
            </ul>
        </div>
    );
}