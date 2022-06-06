import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartQuantity: 0,
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartTotal: 0
});

const addItem = (cartItems, productToAdd) => {
    // find if prodToAdd in cartItems
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if in, increment quantity and return new array with incremented value
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    // else create new array with added item and return
    
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeItem = (cartItems, product) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
    }

    return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}

const deleteItem = (cartItems, product) => {
    return cartItems.filter((cartItem) => cartItem.id !== product.id)
}

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // recalculate cartQuantity anytime cartItems changes
    useEffect(() => {
        const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartQuantity(newCartQuantity)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (product) => {
        setCartItems(removeItem(cartItems, product));
    };

    const deleteItemFromCart = (product) => {
        setCartItems(deleteItem(cartItems, product));
    };

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartQuantity, removeItemFromCart, deleteItemFromCart, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};