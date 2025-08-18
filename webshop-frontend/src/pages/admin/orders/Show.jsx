import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOrder, updateOrder, deleteOrder } from "../../../script/api";

export default function ShowOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrder();
    }, [id]);

    const loadOrder = () => {
        getOrder(id)
            .then(setOrder)
            .catch((err) => console.error("Error fetching order:", err));
    };

    const handleStatusChange = async (newStatus) => {
        try {
            await updateOrder(order.id, newStatus);
            loadOrder();
        } catch (err) {
            console.error("Error updating order:", err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            await deleteOrder(order.id);
            navigate("/admin/orders");
        } catch (err) {
            console.error("Error deleting order:", err);
            alert("Failed to delete order: " + err.message);
        }
    };

    if (!order) return <p>Loading...</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>🛒 Order #{order.id}</h1>
            <p>
                <strong>Status:</strong>{" "}
                <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </p>
            <p>
                <strong>Total Price:</strong> ${order.total_price.toFixed(2)}
            </p>
            <p>
                <strong>User:</strong> {order.user?.email}
            </p>

            <h3>📦 Items</h3>
            <ul>
                {order.order_items.map((item) => (
                    <li key={item.id}>
                        {item.book?.title} — {item.quantity} × ${item.price} = ${item.subtotal}
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: "1rem" }}>
                <Link to="/admin/orders">⬅ Back to Orders</Link>{" "}
                <button
                    onClick={handleDelete}
                    style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginLeft: "1rem",
                    }}
                >
                    Delete Order
                </button>
            </div>
        </div>
    );
}
