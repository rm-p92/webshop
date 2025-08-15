import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../script/api";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export default function CartProvider({ children }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCart = async () => {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setCart(null);
            setLoading(false); // important!
            return;
        }

        try {
            const data = await getCart();
            if (!data.error) {
                setCart(data);
            } else {
                setCart(null);
            }
        } catch (err) {
            console.error("Error loading cart:", err);
            setCart(null);
        } finally {
            setLoading(false); // always stop loading
        }
    };

    const addItem = async (bookId, quantity = 1) => {
        await addToCart(bookId, quantity);
        loadCart();
    };

    const updateItem = async (itemId, quantity) => {
        await updateCartItem(itemId, quantity);
        loadCart();
    };

    const removeItem = async (itemId) => {
        await removeFromCart(itemId);
        loadCart();
    };

    useEffect(() => {
        loadCart();
    }, [localStorage.getItem('token')]);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addItem,
                updateItem,
                removeItem,
                reload: loadCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
