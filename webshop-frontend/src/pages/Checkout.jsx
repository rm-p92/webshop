import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
    const { cart, loading } = useCart();
    const navigate = useNavigate();

    if (loading) return <p>Loading checkout...</p>;
    if (!cart || !cart.cart_items?.length) return <p>Your cart is empty.</p>;

    const handleCheckout = () => {
        alert("Checkout functionality coming soon!");
        navigate("/books");
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Checkout</h1>
            <ul>
                {cart.cart_items.map((item) => (
                    <li key={item.id}>
                        {item.book?.title} — ${item.book?.price} × {item.quantity}
                    </li>
                ))}
            </ul>
            <hr />
            <p>
                <strong>Total:</strong> ${cart.total}
            </p>
            <button onClick={handleCheckout}>Confirm Purchase</button>
        </div>
    );
}
