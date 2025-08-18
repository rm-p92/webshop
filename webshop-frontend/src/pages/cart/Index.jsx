import { useCart } from "../../context/CartContext";
import { useAlert } from "../../context/AlertContext";
import { Link } from "react-router-dom";

export default function CartPage() {
    const { cart, loading, updateItem, removeItem } = useCart();
    const { showAlert } = useAlert();

    if (loading) return <p>Loading cart...</p>;
    if (!cart || !cart.cart_items?.length) return <p>Your cart is empty.</p>;

    const handleQuantityChange = async (itemId, quantity) => {
        try {
            await updateItem(itemId, quantity);
            showAlert("Cart updated successfully", "success");
        } catch {
            showAlert("Failed to update cart", "error");
        }
    };

    const handleRemove = async (itemId) => {
        try {
            await removeItem(itemId);
            showAlert("Item removed from cart", "info");
        } catch {
            showAlert("Failed to remove item", "error");
        }
    };

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
                                    handleQuantityChange(item.id, parseInt(e.target.value))
                                }
                                style={{ width: "50px", marginRight: "0.5rem" }}
                            />
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
            <p>
                <strong>Total:</strong> ${cart.total}
            </p>
            <div style={{ marginTop: "1rem" }}>
                <Link to="/checkout">
                    <button style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
}
