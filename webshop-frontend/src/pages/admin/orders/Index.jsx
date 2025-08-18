import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders, deleteOrder } from "../../../script/api";

export default function OrdersIndex() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            await deleteOrder(id);
            setOrders((prev) => prev.filter((order) => order.id !== id));
        } catch (err) {
            alert("Failed to delete order: " + err.message);
        }
    }

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!orders.length) return <p>No orders found.</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>📦 Manage Orders</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {orders.map((order) => (
                    <li
                        key={order.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            padding: "0.75rem",
                            marginBottom: "0.75rem",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <strong>Order #{order.id}</strong> —{" "}
                        <span
                            style={{
                                color:
                                    order.status === "completed"
                                        ? "green"
                                        : order.status === "cancelled"
                                        ? "red"
                                        : "orange",
                            }}
                        >
                            {order.status}
                        </span>
                        <div>
                            <strong>Total:</strong> ${order.total_price.toFixed(2)}
                        </div>
                        <div>
                            <strong>Customer:</strong>{" "}
                            {order.user?.email || "Unknown"}
                        </div>
                        <div style={{ marginTop: "0.5rem" }}>
                            <Link to={`/admin/orders/${order.id}`}>
                                View details →
                            </Link>{" "}
                            |{" "}
                            <button
                                onClick={() => handleDelete(order.id)}
                                style={{
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "0.3rem 0.6rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
