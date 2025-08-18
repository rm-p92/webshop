import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrder } from "../../script/api";

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadOrder() {
            try {
                const data = await getOrder(id);
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadOrder();
    }, [id]);

    if (loading) return <p>Loading order...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!order) return <p>Order not found.</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>🛒 Order #{order.id}</h1>
            <p>
                <strong>Status:</strong>{" "}
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
            </p>
            <p>
                <strong>Total Price:</strong> ${order.total_price.toFixed(2)}
            </p>

            <h3>📦 Items</h3>
            <ul>
                {order.order_items.map((item) => (
                    <li key={item.id}>
                        {item.book?.title} — {item.quantity} × ${item.price} = $
                        {item.subtotal}
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: "1rem" }}>
                <Link to="/orders">⬅ Back to Orders</Link>
            </div>
        </div>
    );
}
