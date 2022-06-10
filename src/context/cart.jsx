import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer";

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

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartQuantity: 0,
    cartTotal: 0
};

const CART_ACTIONS_TYPE = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTIONS_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTIONS_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {
    /*
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
    */

    const [{cartItems, isCartOpen, cartQuantity, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartQuantity = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(
            createAction(CART_ACTIONS_TYPE.SET_CART_ITEMS, {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartQuantity: newCartQuantity 
            })
        );
        //dispatch({ type: CART_ACTIONS_TYPE.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartTotal: newCartTotal, cartQuantity: newCartQuantity }});
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (product) => {
        const newCartItems = removeItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    };

    const deleteItemFromCart = (product) => {
        const newCartItems = deleteItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTIONS_TYPE.SET_IS_CART_OPEN, bool)
        );
        //dispatch({ type: CART_ACTIONS_TYPE.SET_IS_CART_OPEN, payload: bool });
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartQuantity, removeItemFromCart, deleteItemFromCart, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};