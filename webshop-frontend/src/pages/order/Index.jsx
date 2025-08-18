import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../script/api";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrders() {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadOrders();
    }, []);

    if (loading) return <p>Loading your orders...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!orders.length) return <p>You have no orders yet.</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>📦 Your Orders</h1>
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
                        <Link to={`/orders/${order.id}`}>View details →</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
