import { useCart } from "../../context/CartContext";

export default function CartPage() {
    const { cart, loading, updateItem, removeItem } = useCart();

    if (loading) return <p>Loading cart...</p>;
    if (!cart || !cart.cart_items?.length) return <p>Your cart is empty.</p>;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>🛒 Your Cart</h1>
            <ul>
                {cart.cart_items.map((item) => (
                    <li key={item.id}>
                        <strong>{item.book?.title}</strong> — ${item.book?.price}
                        <div>
                            Qty:{" "}
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                    updateItem(item.id, parseInt(e.target.value))
                                }
                                style={{ width: "50px", marginRight: "0.5rem" }}
                            />
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
            <p>
                <strong>Total:</strong> ${cart.total}
            </p>
        </div>
    );
}