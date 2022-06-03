import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartQuantity: 0
});

const addItem = (cartItems, productToAdd) => {
    // find if prodToAdd in cartItems
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if in, increment quantity and return new array with incremented value
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    // else create new array with added item and return
    else {
        return [...cartItems, {...productToAdd, quantity: 1}];
    }
}

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);

    // recalculate cartQuantity anytime cartItems changes
    useEffect(() => {
        const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartQuantity(newCartQuantity)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addItem(cartItems, productToAdd));
    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartQuantity};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};